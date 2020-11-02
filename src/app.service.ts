import { Req, Request } from '@nestjs/common';
import { Injectable, HttpException } from "@nestjs/common";
import organizations from "./db/organizations.json";
import tickets from "./db/tickets.json";
import users from "./db/users.json";

@Injectable()
export class AppService {

  async getOrganizations(@Req() request: Request) {
    try {
      let organizationsData = [];
      for (let organization of organizations) {
        let ticketsData = [];
        let usersData = [];
        for (let ticket of tickets) {
          if(organization._id===ticket.organization_id){
            let obj = {
              "ticket_id": ticket._id,
              "ticket_subject": ticket.subject
            }
            ticketsData.push(obj);
          }
        }
        for (let user of users) {
          if(organization._id===user.organization_id){
            let obj = {
              "user_id": user._id,
              "user_name": user.name
            }
            usersData.push(obj);
          }
        }
        let organizationData = {
          "_id": organization._id,
          "name": organization.name,
          "ticketsData":ticketsData,
          "usersData":usersData
        }        
        organizationsData.push(organizationData);
      }
      return organizationsData;
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
