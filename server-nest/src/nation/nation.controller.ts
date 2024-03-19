import { Controller, Get } from "@nestjs/common";
import { NationService } from "./nation.service";

@Controller("nation")
export class NationController {
  constructor(private readonly nationService: NationService) {}
  @Get("getall")
  async verify(req, res) {
    return this.nationService.getAll();
  }
}
