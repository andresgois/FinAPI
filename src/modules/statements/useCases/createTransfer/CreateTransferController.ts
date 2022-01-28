import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateTransferUseCase } from "./CreateTransferUseCase";

class CreateTransferController {
    async handle(request: Request, response: Response) {

        const { id: sender_id } = request.user
        const { receiver_id } = request.params
        const { amount, description } = request.body

        const createTransferUseCase = container.resolve(CreateTransferUseCase)

        const transfer = await createTransferUseCase.execute({
            sender_id,
            receiver_id,
            amount,
            description
        })
//https://github.com/luanrjjj/DesafioTestesUnit-rios/tree/main/src
        return response.status(201).json(transfer)
    }
}

export { CreateTransferController }
/*    const splittedPath = request.originalUrl.split('/')
    let type = splittedPath[splittedPath.length - 2] as OperationType;
    type = type.substring(0, type.length - 1) as OperationType;
*/
