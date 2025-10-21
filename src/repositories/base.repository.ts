import { PrismaService } from '../prisma/prisma.service';

export abstract class BaseRepository<T> {
  constructor(protected readonly prisma: PrismaService) {}

  abstract create(data: any): Promise<T>;
  abstract findAll(): Promise<T[]>;
  abstract findOne(id: number): Promise<T | null>;
  abstract update(id: number, data: any): Promise<T>;
  abstract remove(id: number): Promise<T>;
}
