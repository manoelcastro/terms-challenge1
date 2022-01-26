/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-useless-constructor */
import { PrismaClient } from '@prisma/client';

export default class PrismaConnection {
  private static connection: PrismaClient;

  private constructor() {}

  static getConnection() {
    if (!this.connection) {
      this.connection = new PrismaClient();
    }
    return this.connection;
  }
}
