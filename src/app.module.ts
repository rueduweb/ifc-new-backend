import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { FeatureUserModule } from './feature-user/feature-user.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { FeatureUserController } from './feature-user/feature-user.controller';
import { FeatureUserService } from './feature-user/feature-user.service';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerSilentProxyGuard } from './guards/throttler-silent-proxy.guard';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000,
        limit: 3,
      },
      {
        name: 'medium',
        ttl: 10000,
        limit: 20,
      },
      {
        name: 'long',
        ttl: 60000,
        limit: 100,
      },
    ]),
    DatabaseModule,
    FeatureUserModule,
  ],
  controllers: [AppController, FeatureUserController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerSilentProxyGuard,
    },
    AppService,
    FeatureUserService,
  ],
})
export class AppModule {}
