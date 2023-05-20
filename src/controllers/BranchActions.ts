import { Request, Response } from "express";
import { Branch } from "../entity/Branch";
import { AppDataSource } from "../data-source";

export async function branchGetAllAction(request: Request, response: Response) {

    const branchRepository = AppDataSource.getRepository(Branch);

    const branches = await branchRepository.find();

    response.status(200);
    response.send(branches);
}

export async function branchGetByIdAction(request: Request, response: Response) {

    const branchRepository = AppDataSource.getRepository(Branch);

    const branch = await branchRepository.findOne({ where: { branch_id: request.params.id } });

    if (!branch) {
        response.status(404);
        response.end();
        return;
    }
    response.status(200);
    response.send(branch);
}

export async function branchSaveAction(request: Request, response: Response) {

    const branchRepository = AppDataSource.getRepository(Branch);

    const newbranch = branchRepository.create(request.body);

    await branchRepository.save(newbranch);

    response.send(newbranch);
}

export async function branchUpdateAction(request: Request, response: Response) {

    const branchRepository = AppDataSource.getRepository(Branch);

    const { branch_id, ...updatedValues } = request.body;

    await branchRepository.update(branch_id, updatedValues);

    response.status(201);
    response.end();
}

export async function branchDeleteAction(request: Request, response: Response) {

    const branchRepository = AppDataSource.getRepository(Branch);

    await branchRepository.delete(request.body.branch_id);


    response.status(204);
    response.end();
}