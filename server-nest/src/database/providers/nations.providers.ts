import { Connection } from "mongoose";
import { nationSchema } from "src/schemas/nationSchema";

export const catsProviders = [
  {
    provide: "NATION",
    useFactory: (connection: Connection) =>
      connection.model("Cat", nationSchema),
    inject: ["DATABASE_CONNECTION"],
  },
];
