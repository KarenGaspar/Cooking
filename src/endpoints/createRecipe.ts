import { Request, Response } from "express";
import { RecipeDatabase } from "../data/RecipeDatabase";
import { Recipe } from "../entities/Recipe";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export async function createRecipe(req: Request, res: Response){
    try {
        const {title, description} = req.body
        const token = req.headers.authorization as string

        if(!title || !description){
            res.status(422).send("Preencha todos os campos")
        }

        if(!token){
            res.status(422).send("Token inválido ou não passado nos headers")
        }

        const recipeDatabase = new RecipeDatabase()
        const recipe: any = await recipeDatabase.findRecipeByTitle(title)

        if(recipe){
            res.status(409).send("Receita já cadastrada")
        }

        const idGenerator = new IdGenerator()
        const id = idGenerator.generate()

        const authenticator = new Authenticator()
        const tokenData = authenticator.getTokenData(token)
        
        const newDate = new Date()
        const createdAt = newDate.toLocaleDateString('pt-BR')

        const newRecipe = new Recipe(id, title, description, createdAt, tokenData.id)
        await recipeDatabase.createRecipe(newRecipe)

        res.status(201).send({message: "Receita criada com sucesso"})
    } catch (error: any) {
        res.status(400).send(error.message || error.sqlMessage)
    }
}