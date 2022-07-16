describe.skip('Catching timer error', async () => {
  class Deferred<T = void> {
    private readonly _promise: Promise<T>;
    private _resolve!: (res: T | PromiseLike<T>) => void;
    private _reject!: (err: Error) => void;

    constructor() {
      this._promise = new Promise<T>((res, rej) => {
        this._resolve = res;
        this._reject = rej;
      });
    }

    public resolve(res: T | PromiseLike<T>): void {
      this._resolve(res);
    }

    public reject(err: Error): void {
      this._reject(err);
    }

    public promise() {
      return this._promise;
    }
  }

  class TimerCatching {
    private readonly deferred = new Deferred();
    private timer!: NodeJS.Timeout | null;

    constructor(private readonly maxTimeMS: number) {
      this.init();
    }

    public async wrap(promise: Promise<void>) {
      const self = this;

      await new Promise(async (res, rej) => {
        self.getPromise().catch(err => {
          rej(new Error(err.message));
          self.stop();
        });

        try {
          await promise;
          self.stop();
        } catch (err: unknown) {
          self.stop();
          rej(err);
        }
      });
    }

    private init(): void {
      this.timer = setTimeout(() => {
        this.deferred.reject(new Error('Max computing time exceeded'));
      }, this.maxTimeMS);
    }

    public stop(): void {
      if (this.timer) {
        this.deferred.resolve();
        clearTimeout(this.timer);
        this.timer = null;
      }
    }

    public getPromise(): Promise<any> {
      return this.deferred.promise();
    }
  }

  it('test timer', async () => {
    async function test() {
      setTimeout(() => {
        throw new Error('inside timeout');
      }, 2000);

      await new Promise<void>((res, rej) => {
        setTimeout(() => {
          res();
        }, 3000);
      });
    }

    const timer = new TimerCatching(2000);
    await timer.wrap(test());
  });
});
