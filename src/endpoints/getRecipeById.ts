import { Request, Response } from "express";
import { RecipeDatabase } from "../data/RecipeDatabase";
import { Authenticator } from "../services/Authenticator";

export async function getRecipeById(req: Request, res: Response){
    try {
        const token = req.headers.authorization as string
        const {id} = req.params

        if(!token){
            res.status(422).send("Token inválido ou não passado nos headers")
        }

        if(!id){
            res.status(422).send("Id inválido ou não passado nos params")
        }

        const authenticator = new Authenticator()
        const tokenData = authenticator.getTokenData(token)
        const recipeDatabase = new RecipeDatabase()
        const recipe = await recipeDatabase.findRecipeById(id)

        if(!recipe){
            res.status(404).send("Receita não encontrada")
        }
 
        res.status(200).send({recipe})
    } catch (error: any) {
        res.status(400).send(error.message || error.sqlMessage)
    }
}