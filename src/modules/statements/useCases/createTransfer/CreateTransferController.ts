import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateTransferUseCase } from "./CreateTransferUseCase";

enum OperationType {
  TRANSFER = 'transfer'
}

export class CreateTransferController {

  async execute(request: Request, response: Response): Promise<Response> {
    // vêm da url
    const { user_id } = request.params;
    // vêm do midlleware, onde pega o id do usuário no header
    const { id: sender_id } = request.user;
    const { amount, description } = request.body;

    const splittedPath = request.originalUrl.split('/')
    let type = splittedPath[splittedPath.length - 2] as OperationType;
    type = type.substring(0, type.length - 1) as OperationType;

    const createStatement = container.resolve(CreateTransferUseCase);

    const statement = await createStatement.execute({
      user_id,
      sender_id,
      type,
      amount,
      description
    });

    return response.status(201).json(statement);

  }

}
