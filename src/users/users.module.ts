import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
    imports: [
        ConfigModule,
        HttpModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                baseURL: configService.get<string>('BASE_URL'),
                timeout: 5000,
                headers: {},
            }),
        }),
    ],
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule { }
