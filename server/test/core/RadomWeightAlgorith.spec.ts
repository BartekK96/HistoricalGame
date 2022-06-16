import { pipeline, Readable, Transform, TransformCallback } from 'stream';

describe.skip('RandomWeightAlgorith', () => {
  class DummyRepo {
    public getDataFromDB(): Readable {
      const stream: Readable = new Readable();
      const data = Array.from({ length: 100 }, (value, iterator) => iterator);
      data.map(data => stream.push(data));
      stream.push(null);
      return stream;
    }
  }

  class SplitStream extends Transform {
    constructor() {
      super({ objectMode: true });
    }
    _transform(
      chunk: any,
      encoding: BufferEncoding,
      callback: TransformCallback,
    ): void {}

    _flush(callback: TransformCallback): void {}
  }

  it('split data for several parts', async () => {
    const repo = new DummyRepo();

    await pipeline(repo.getDataFromDB(), new SplitStream());
  });
});
