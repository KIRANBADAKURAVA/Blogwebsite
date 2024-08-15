import config from '../config/config.js'
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service{
    client = new Client()
    databasess
    bucket
    constructor(){
        this.client = new Client()
                        .setEndpoint(config.appwrite_url)
                        .setProject(config.appwrite_project_id)
       this.databases = new Databases(this.client);
         this.bucket = new Storage(this.client);
    }
    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(
                config.appwrite_database_id,
                config.appwrite_collection_id,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                config.appwrite_database_id,
                config.appwrite_collection_id,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,

                }
            )
        } catch (error) {
            console.log("Appwrite serive :: updatePost :: error", error);
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                config.appwrite_database_id,
                config.appwrite_collection_id,
                slug
            
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deletePost :: error", error);
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                config.appwrite_database_id,
                config.appwrite_collection_id,
                slug
            
            )
        } catch (error) {
            console.log("Appwrite serive :: getPost :: error", error);
            return false
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                config.appwrite_database_id,
                config.appwrite_collection_id,
                queries,
                

            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }

 

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                config.appwrite_bucket_id,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                config.appwrite_bucket_id,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }

    getFilePreview(fileId){
        try {
            return this.bucket.getFilePreview(
                config.appwrite_bucket_id,
                fileId
            )
        } catch (error) {
            console.log("Appwrite serive :: getFilePreview :: error", error);
        }
    }
}


const service = new Service()
export default service

