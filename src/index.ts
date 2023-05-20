import express = require("express")
import { AppDataSource } from "./data-source"
import { Role, User } from "./entity/User"
import { Request, Response } from "express"
import { AppRoutes } from "./routes"

AppDataSource.initialize().then(async () => {

    // console.log("Inserting a new user into the database...")
    // const user = new User()
    // user.password = "password"
    // user.role = Role.OWNER
    // user.username = "owner1"
    // await AppDataSource.manager.save(user)
    // console.log("Saved a new user with id: " + user.id)

    // console.log("Loading users from the database...")
    // const users = await AppDataSource.manager.find(User)
    // console.log("Loaded users: ", users)

    // console.log("Here you can setup and run express / fastify / any other framework.")

    const app = express();
    app.use(express.urlencoded({extended: false}));
    app.use(express.json());

    AppRoutes.forEach(route => {
        const middleware = Array.isArray(route.action) ? route.action : [route.action]; // Ensure action is an array
        app[route.method](route.path, (request: Request, response: Response, next: Function) => {
            Promise.all(middleware.map(fn => fn(request, response)))
                .then(() => next)
                .catch(err => next(err));
        });
    });

    app.listen(3000, () => {
        console.log('The application is listening on port 3000!');
    });

}).catch(error => console.log(error))



