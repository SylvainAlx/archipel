"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    const mongoose = app.get('MongooseConnection');
    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.MONGO_DB_URI);
    mongoose.connection.on('error', () => {
        console.log('Erreur lors de la connexion à la base de données');
    });
    mongoose.connection.on('open', () => {
        console.log('Connexion à la base de données établie');
    });
    const PORT = process.env.PORT || 3000;
    await app.listen(PORT);
    console.log(`Serveur en écoute sur le port ${PORT}`);
}
bootstrap();
//# sourceMappingURL=main.js.map