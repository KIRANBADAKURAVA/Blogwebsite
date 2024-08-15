import { Client, Account, ID } from "appwrite";
import config from "../config/config"; 

export class AuthService {
  client;
  account;

  constructor() {
    this.client = new Client()
      .setEndpoint(config.appwrite_url) 
      .setProject(config.appwrite_project_id); 
    this.account = new Account(this.client);
  }

  async createAcc({ email, password }) {
    try {
      const userAcc = await this.account.create(ID.unique(), email, password);
      if (userAcc) {
        return this.login({ email, password });
      }
    } catch (error) {
      console.error("Error creating account:", error);
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  }

  async getUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.error("Error getting user:", error);
      throw error;
    }
  }

  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.error("Error logging out:", error);
      throw error;
    }
  }
}

const auth = new AuthService();

export default auth;
