import { BaseDatabase } from "./BaseDatabase";

class Migrations {
    async createTable(){
        await BaseDatabase.connection.raw(`
        CREATE TABLE cookenu_users(
            id VARCHAR(255) PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL
            );
        
        CREATE TABLE cookenu_recipes(
            id VARCHAR(255) PRIMARY KEY,
            title VARCHAR(255) NOT NULL UNIQUE,
            description TEXT NOT NULL,
            created_at DATE NOT NULL,
            user_id VARCHAR(255) NOT NULL,
            FOREIGN KEY (user_id) REFERENCES cookenu_users(id)
            );
        CREATE TABLE cookenu_followers(
            follower_id VARCHAR(255) NOT NULL,
            user_to_follow_id VARCHAR(255) NOT NULL,
            FOREIGN KEY (follower_id) REFERENCES cookenu_users(id),
            FOREIGN KEY (user_to_follow_id) REFERENCES cookenu_users(id)
        );
        `)
        console.log("Tabelas criadas")
        BaseDatabase.connection.destroy()    
    }
}

new Migrations().createTable();