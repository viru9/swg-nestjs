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
            let obj = ticket.subject;
            ticketsData.push(obj);
          }
        }
        for (let user of users) {
          if(organization._id===user.organization_id){
            let obj = user.name;
            usersData.push(obj);
          }
        }
        let organizationData = {
          "_id": organization._id,
          "name": organization.name,
          "tickets":ticketsData,
          "users":usersData
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
      let ticketsData = [];
      for (let ticket of tickets) {
        let assigneeName = [];
        let submitterName = [];
        let organizationName= []
        for (let user of users) {
          if(user._id===ticket.assignee_id){
            let obj = user.name;
            assigneeName.push(obj);
          }
          if(user._id===ticket.submitter_id){
            let obj = user.name;
            submitterName.push(obj);
          }
        }
        for (let organization of organizations) {
          if(ticket.organization_id===organization._id){
            let obj = organization.name;
            organizationName.push(obj);
          }
        }
        let ticketData = {
          "_id": ticket._id,
          "name": ticket.subject,
          "assignee":assigneeName,
          "submitter":submitterName,
          "organization":organizationName
        }        
        ticketsData.push(ticketData);
      }
      return ticketsData;
    } catch (error) {
      throw new HttpException(error, error.status);
    }
  }

  async getUsers(@Req() request: Request) {
    try {
      let usersData = [];
      for (let user of users) {
        let assigneeTickets = [];
        let submittedTickets = [];
        let userOrganization= []
        for (let ticket of tickets) {
          if(user._id===ticket.assignee_id){
            let obj = ticket.subject;
            assigneeTickets.push(obj);
          }
          if(user._id===ticket.submitter_id){
            let obj = ticket.subject;
            submittedTickets.push(obj);
          }
        }
        for (let organization of organizations) {
          if(user.organization_id===organization._id){
            let obj = organization.name;
            userOrganization.push(obj);
          }
        }
        let userData = {
          "_id": user._id,
          "name": user.name,
          "assignee_tickets":assigneeTickets,
          "submitted_tickets":submittedTickets,
          "user_organization":userOrganization
        }        
        usersData.push(userData);
      }
      return usersData;
    } catch (error) {
      throw new HttpException(error, error.status);
    }
  }

}
