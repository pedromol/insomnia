import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Health } from './app.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IHealthSchema } from './app.schema';

@Injectable()
export class HealthService {
  constructor(
    @InjectRepository(Health)
    private healthRepository: Repository<Health>,
    @InjectModel('Health')
    private readonly mongoHealthModel: Model<IHealthSchema>,
  ) { }

  async createHealth(value: string): Promise<[Health, IHealthSchema]> {
    const health = this.healthRepository.create({ value });
    const mongoHealth = new this.mongoHealthModel({ value });
    return Promise.all([this.healthRepository.save(health), mongoHealth.save()]);
  }

  async deleteHealth(id: number, mid: string): Promise<void> {
    await Promise.all([this.healthRepository.delete(id), this.mongoHealthModel.deleteOne({ _id: mid })]);
  }
}