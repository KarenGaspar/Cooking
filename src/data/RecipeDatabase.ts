import moment from "moment";
import { Recipe } from "../entities/Recipe";
import { BaseDatabase } from "./BaseDatabase";

export class RecipeDatabase extends BaseDatabase {
    public async createRecipe(recipe: Recipe) {
        try {
            await BaseDatabase
                .connection('cookenu_recipes')
                .insert({
                    id: recipe.getId(),
                    title: recipe.getTitle(),
                    description: recipe.getDescription(),
                    created_at: recipe.getCreatedAt(),
                    user_id: recipe.getUserId()
                })
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    public async findRecipeByTitle(title: string): Promise<Recipe> {
        try {
            const recipe = await BaseDatabase
                .connection('cookenu_recipes')
                .select('*')
                .where({ title })
            return recipe[0] && Recipe.toUserModel(recipe[0])
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    public async findRecipeById(id: string): Promise<Recipe> {
        try {
            const result = await BaseDatabase
                .connection('cookenu_recipes')
                .select('id', 'title', 'description', 'created_at as createdAt')
                .where({ id })
            return result[0]
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    public async getFeed(id: string): Promise<any> {
        try {
            const result = await BaseDatabase.connection('cookenu_recipes as r')
                .join('cookenu_followers as f', 'r.user_id', 'f.user_to_follow_id')
                .join('cookenu_users as u', 'f.user_to_follow_id', 'u.id')
                .select(
                    'r.id',
                    'u.name',
                    'r.user_id',
                    'r.title',
                    'r.description',
                    'r.created_at'
                )
                .where({ follower_id: id })
                .orderBy('created_at', 'desc')

            const feed = [];

            for (const item of result) {
                const dateFormat = moment(item.created_at).format('DD/MM/YYYY')

                feed.push({
                    id: item.id,
                    title: item.title,
                    description: item.description,
                    createdAt: dateFormat,
                    userId: item.user_id,
                    userName: item.name
                })
            }
            return feed

        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }
}