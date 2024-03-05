import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuration de CORS
  app.enableCors();

  // Configuration de la connexion à la base de données MongoDB avec Mongoose
  const mongoose = app.get('MongooseConnection');
  mongoose.set('strictQuery', false);
  await mongoose.connect(process.env.MONGO_DB_URI);
  mongoose.connection.on('error', () => {
    console.log('Erreur lors de la connexion à la base de données');
  });
  mongoose.connection.on('open', () => {
    console.log('Connexion à la base de données établie');
  });

  // Configuration des routes
  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);
  console.log(`Serveur en écoute sur le port ${PORT}`);
}
bootstrap();
