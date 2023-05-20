import { Request, Response } from "express";
import { User } from "../entity/User";
import { AppDataSource } from "../data-source";


export async function userGetAllAction(request: Request, response: Response) {

    
    const userRepository = AppDataSource.getRepository(User);

    const users = await userRepository.find();

    response.status(200);
    response.send(users);
}

export async function userGetByIdAction(request: Request, response: Response) {

    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOne({ where: { id: request.params.id } });

    if (!user) {
        response.status(404);
        response.end();
        return;
    }
    response.status(200);
    response.send(user);
}

export async function userSaveAction(request: Request, response: Response) {

    const userRepository = AppDataSource.getRepository(User);

    const newuser = userRepository.create(request.body);

    await userRepository.save(newuser);

    response.send(newuser);
}

export async function userUpdateAction(request: Request, response: Response) {

    const userRepository = AppDataSource.getRepository(User);

    await userRepository.update(request.body.user_id, request.body);


    response.status(201);
    response.end();
}

export async function userDeleteAction(request: Request, response: Response) {

    const userRepository = AppDataSource.getRepository(User);

    await userRepository.delete(request.body.user_id);


    response.status(204);
    response.end();
}