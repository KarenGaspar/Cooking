import {app} from "./app"
import { createRecipe } from "./endpoints/createRecipe"
import { followUser } from "./endpoints/followUser"
import { getFeed } from "./endpoints/getFeed"
import { getRecipeById } from "./endpoints/getRecipeById"
import { getUserById } from "./endpoints/getUserById"
import { getUserProfile } from "./endpoints/getUserProfile"
import { login } from "./endpoints/login"
import { signup } from "./endpoints/signup"
import { unfollowUser } from "./endpoints/unfollowUser"

app.post("/signup", signup)
app.post("/login", login)
app.post("/user/follow", followUser)
app.post("/user/unfollow", unfollowUser)
app.post("/recipe", createRecipe)
app.get("/profile", getUserProfile)
app.get("/user/feed", getFeed)
app.get("/user/:id", getUserById)
app.get("/recipe/:id", getRecipeById)
