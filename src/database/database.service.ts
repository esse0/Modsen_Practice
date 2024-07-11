import { Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async clearDatabase() {
    const models = Reflect.ownKeys(this).filter((key) => key[0] !== "_");

    return Promise.all(models.map((modelKey) => this[modelKey].deleteMany()));
  }
}
