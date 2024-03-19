import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const PORT = 9876;
  await app.listen(PORT);
  console.log(`Serveur en écoute sur le port ${PORT}`);
}
bootstrap();
