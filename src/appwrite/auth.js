import conf from "../config/Config";
import { Account,Client,ID } from "appwrite";

export class Authservice{
    client=new Client();
    account;
    constructor(){
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
        this.account=new Account(this.client);
    }
// create account
    async createAccount({email,password,name}){
        try{
            const userAccount =await this.account.create(ID.unique(),email,password,name);
            if(userAccount){
            //  login method
            return this.login({email,password})
            }
            else{
                return userAccount;
            }
        }catch(err){
            throw err;

        }
    }
// login user
    async login({email,password}){
        try {
           return await this.account.createEmailPasswordSession(email,password);
            
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            console.log("Appwrite service:: getCurrentUser::error",error);
        }
        return null;
    }

    async logout(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            throw error;
            
        }
    }
}

const authService=new Authservice();

export default authService;