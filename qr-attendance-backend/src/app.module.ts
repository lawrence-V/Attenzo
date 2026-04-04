import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // database type
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'hrm_db',

      autoLoadEntities: true, // auto load entities
      synchronize: true, // auto create tables (DEV only)
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
