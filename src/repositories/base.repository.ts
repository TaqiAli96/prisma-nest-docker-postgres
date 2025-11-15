import { PrismaService } from '../prisma/prisma.service';

export abstract class BaseRepository<T> {
  constructor(protected readonly prisma: PrismaService) {}

  abstract create(data: any): Promise<T>;
  abstract findAll(): Promise<T[]>;
  abstract findOne(id: string): Promise<T | null>;
  abstract update(id: string, data: any): Promise<T>;
  abstract remove(id: string): Promise<T>;
}
