import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { doubleCsrf } from 'csrf-csrf';
import helmet from 'helmet';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:4200'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Range', 'X-Total-Count'],
    credentials: true,
    maxAge: 600,
  });
  const { doubleCsrfProtection } = doubleCsrf({
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 60,
    },
    getSecret: () => process.env.CSRF_SECRET as string,
    getSessionIdentifier: (req: any) => req.sessionID as string,
  });
  app.use(doubleCsrfProtection);
  app.set('trust proxy', 'loopback');
  app.use(
    helmet({
      crossOriginOpenerPolicy: false,
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false,
      crossOriginResourcePolicy: false,
      originAgentCluster: false,
      permittedCrossDomainPolicies: false,
      referrerPolicy: false,
      strictTransportSecurity: false,
      xContentTypeOptions: false,
      xDownloadOptions: false,
      xFrameOptions: false,
    }),
  );
  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
