import { Module, OnModuleInit } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { NationModule } from "./nation/nation.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule], // Importez ConfigModule pour pouvoir utiliser ConfigService
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>("MONGO_DB_URI"), // Obtenez l'URI de la base de données à partir des variables d'environnement
      }),

      inject: [ConfigService], // Injectez ConfigService dans la factory
    }),
    AuthModule,
    NationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    try {
      await MongooseModule.forRootAsync({
        useFactory: async () => {
          console.log("Tentative de connexion à la base de données...");
          return {
            uri: this.configService.get<string>("DATABASE_URI"),
          };
        },
      });
      console.log("Connexion à la base de données réussie.");
    } catch (error) {
      console.error(
        "Erreur lors de la connexion à la base de données :",
        error,
      );
    }
  }
}
