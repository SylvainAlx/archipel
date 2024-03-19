import { Inject, Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { TypNation } from "src/interfaces/nation.interface";

@Injectable()
export class NationService {
  constructor(
    @Inject("NATION_SCHEMA")
    private nationModel: Model<TypNation>,
  ) {}
  async getAll(): Promise<TypNation[]> {
    return this.nationModel.find().exec();
  }
}
