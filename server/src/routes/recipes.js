import express from 'express'
import mongoose from 'mongoose'
import { RecipeModel } from "../models/Recipes.js";
import { UserModel } from '../models/Users.js';

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const response = await RecipeModel.find({})
        res.json(response)
    } catch (err) {
        res.json(err)
    }
})

router.post('/', async (req, res) => {
    const recipe = new RecipeModel(req.body)
    try {
        const response = await recipe.save()
        res.json(response)
    } catch (err) {
        res.json(err)
    }
})

router.put('/', async (req, res) => {
    try {
        const recipe = await RecipeModel.findById(req.body.recipedId)
        const user = await UserModel.findById(req.body.userId)
        user.savedRecipes.push(recipe)
        res.json({savedRecipes: user.savedRecipes})
    } catch (err) {
        res.json(err)
    }
})



export {router as recipesRouter}