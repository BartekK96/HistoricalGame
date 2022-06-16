import { Inject, Injectable } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Enum } from '../../src/kernel/decorators/Enum';
import { FastRepository } from '../../src/kernel/decorators/FastRepository';

describe.only('FastRepository', async () => {
  interface IDate {
    login: string;
    password: string;
    id: string;
  }

  interface IExtendedData extends IDate {
    version: number;
  }

  it.only('test', async () => {
    @Enum.decorate()
    class ConnectionNames extends Enum {
      public static readonly FAST_REPO = new ConnectionNames('FAST_REPO');
      public static readonly COMMON_REPO = new ConnectionNames('COMMON_REPO');
    }

    @Injectable()
    class Repository {
      constructor(
        @Inject(ConnectionNames.COMMON_REPO.toString())
        private readonly databaseConnection: Map<string, IDate>,
        @Inject(ConnectionNames.FAST_REPO.toString())
        private readonly fastRepo: Set<IDate>,
      ) {}

      public async add(data: IDate): Promise<void> {
        this.databaseConnection.set(data.id, data);
      }

      public async getByID(id: string): Promise<IExtendedData> {
        const data = this.databaseConnection.get(id);
        if (!data) {
          throw new Error('Data not found');
        }
        return { ...data, version: 1 };
    }
    }

    const moduleRef = await Test.createTestingModule({
      providers: [
        Repository,
        {
          provide: ConnectionNames.FAST_REPO.toString(),
          useValue: new Set(),
        },
        {
          provide: ConnectionNames.COMMON_REPO.toString(),
          useValue: new Map(),
        },
      ],
    }).compile();

    const repo = moduleRef.get(Repository);
    repo.add({id:'1',login:'test',password:'test'})

    for (const member in repo) {
        if (repo.hasOwnProperty(member)) {
          console.log(member)
        }
      }
  });
});
