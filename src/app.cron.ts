import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { HealthService } from './app.service';
import { faker } from '@faker-js/faker';

@Injectable()
export class HealthTask {
    constructor(private readonly healthService: HealthService) { }

    @Cron('0 */10 * * * *')
    async handleCron() {
        const newHealth = await this.healthService.createHealth(faker.hacker.phrase());
        await new Promise(resolve => setTimeout(resolve, 1000));
        await this.healthService.deleteHealth(newHealth[0].id, newHealth[1]._id.toString());
    }
}