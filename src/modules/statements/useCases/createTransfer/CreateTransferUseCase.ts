import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../../users/repositories/IUsersRepository";
import { OperationType } from "../../entities/Statement";
import { IStatementsRepository } from "../../repositories/IStatementsRepository";
import { CreateStatementError } from "../createStatement/CreateStatementError";
import { ICreateTransferDTO } from "./ICreateTransferDTO";


@injectable()
export class CreateTransferUseCase {

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('StatementsRepository')
    private statementsRepository: IStatementsRepository
  ){}

  async execute({
    user_id,
    sender_id,
    type,
    amount,
    description
  }: ICreateTransferDTO){
    const userHeader = await this.usersRepository.findById(sender_id as string);
    const userUrl = await this.usersRepository.findById(user_id);

    if(!userHeader || !userUrl) {
      throw new CreateStatementError.UserNotFound();
    }

    const { balance } = await this.statementsRepository.getUserBalance({ user_id });
      if (balance < amount) {
        throw new CreateStatementError.InsufficientFunds()
      }

    const statementOperation = await this.statementsRepository.create({
      user_id,
      type: OperationType.TRANSFER,
      sender_id,
      amount,
      description
    });


    return statementOperation;
  }

}
