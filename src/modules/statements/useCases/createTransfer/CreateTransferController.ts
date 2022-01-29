import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateTransfersUseCase } from "./CreateTransferUseCase";

class CreateTransferController {
    async execute(request: Request, response: Response): Promise<Response> {

        const { id: sender_id } = request.user
        const { receiver_id } = request.params
        const { amount, description } = request.body

        const createTransferUseCase = container.resolve(CreateTransfersUseCase)

        const transfer = await createTransferUseCase.execute({
          amount,
          description,
          sender_id,
          receiver_id
        })
        return response.status(201).json(transfer)
    }
}

export { CreateTransferController }
/*    const splittedPath = request.originalUrl.split('/')
    let type = splittedPath[splittedPath.length - 2] as OperationType;
    type = type.substring(0, type.length - 1) as OperationType;
*/
