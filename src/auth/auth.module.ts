import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { HttpModule } from '@nestjs/axios';


@Module({
    imports: [
        HttpModule.register({
            baseURL: 'https://api.themoviedb.org/3',
            timeout: 5000,
            headers:{},
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule { }
