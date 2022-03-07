import { Request, Response } from "express";
import { RecipeDatabase } from "../data/RecipeDatabase";
import { Authenticator } from "../services/Authenticator";

export async function getFeed(req: Request, res: Response){
    try {
        const token = req.headers.authorization as string

        if(!token){
            res.status(422).send("Token inválido ou não passado nos headers")
        }

        const authenticator = new Authenticator()
        const tokenData = authenticator.getTokenData(token)
        const recipeDatabase = new RecipeDatabase()
        const recipeFeed = await recipeDatabase.getFeed(tokenData.id)

        res.status(200).send({recipes: recipeFeed})
    } catch (error: any) {
        res.status(400).send(error.message || error.sqlMessage)
    }
}