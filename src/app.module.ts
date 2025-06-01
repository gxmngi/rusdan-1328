import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { UsersModule } from './modules/users/users.module';
import { CategoriesModule } from './modules/categories/categories.module';

//import { UsersnestController } from './generate/modules/usersnest/usersnest.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return typeOrmConfig(configService);
      },
      inject: [ConfigService],
    }),
    UsersModule,CategoriesModule
  ],
  controllers: [AppController,],
  providers: [AppService],
})
export class AppModule {}
