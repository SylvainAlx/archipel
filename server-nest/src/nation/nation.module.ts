import { Module } from "@nestjs/common";
import { NationController } from "./nation.controller";
import { NationService } from "./nation.service";

@Module({
  controllers: [NationController],
  providers: [NationService],
})
export class NationModule {}
