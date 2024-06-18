import { Controller, Get } from '@nestjs/common';
import { HealthCheck, TypeOrmHealthIndicator } from '@nestjs/terminus';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Controller()
export class AppController {
    constructor(
        private db: TypeOrmHealthIndicator,
        @InjectDataSource()
        private oracleConnection: DataSource,
        // @InjectDataSource('mongo')
        // private mongoConnection: DataSource,
    ) { }

    @Get()
    @HealthCheck()
    check() {
        return Promise.all([
            this.db.pingCheck('default', { connection: this.oracleConnection }),
            // this.db.pingCheck('mongo', { connection: this.mongoConnection }),
        ]);
    }
}
