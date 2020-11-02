import { AppService } from './app.service';
import { Controller, Get, Req, Res, Request, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/organizations")
  async getOrganizations(@Req() request: Request, @Res() response: Response) {
    const result = await this.appService.getOrganizations(request);
    response.status(HttpStatus.OK).json(result);
  }

  @Get("/tickets")
  async getTickets(@Req() request: Request, @Res() response: Response) {
    const result = await this.appService.getTickets(request);
    response.status(HttpStatus.OK).json(result);
  }

  @Get("/users")
  async getUsers(@Req() request: Request, @Res() response: Response) {
    const result = await this.appService.getUsers(request);
    response.status(HttpStatus.OK).json(result);
  }


}
