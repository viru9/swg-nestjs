import { Req, Request } from '@nestjs/common';
import { Injectable, HttpException } from "@nestjs/common";
import organizations from "./db/organizations.json";
import tickets from "./db/tickets.json";
import users from "./db/users.json";

@Injectable()
export class AppService {

  async getOrganizations(@Req() request: Request) {
    try {
      return organizations;
    } catch (error) {
      throw new HttpException(error, error.status);
    }
  }

  async getTickets(@Req() request: Request) {
    try {
      return tickets;
    } catch (error) {
      throw new HttpException(error, error.status);
    }
  }

  async getUsers(@Req() request: Request) {
    try {
      return users;
    } catch (error) {
      throw new HttpException(error, error.status);
    }
  }

}
