import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../../users/repositories/IUsersRepository";
import { IStatementsRepository } from "../../repositories/IStatementsRepository";
import { CreateStatementError } from "../createStatement/CreateStatementError";
import { CreateTransferError } from "./CreateTransferError";
import { ICreateTransferDTO } from "./ICreateTransferDTO";


enum OperationType {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
  TRANSFER = 'transfer'
}

@injectable()
export class CreateTransferUseCase {

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('StatementsRepository')
    private statementsRepository: IStatementsRepository
  ){}

  async execute({  sender_id, user_id, amount, description, type }: ICreateTransferDTO){

    const userSender  = await this.usersRepository.findById(sender_id as string);  //pri
    const receiverUser  = await this.usersRepository.findById(user_id as string);  // andre

    if(!userSender ) {
      throw new CreateStatementError.UserNotFound();
    }
    if(!receiverUser ) {
      throw new CreateStatementError.UserNotFound();
    }
    console.log('PRI = userSender : ',userSender )
    console.log('Andre = receiverUser : ',receiverUser )

    //if(type === 'transfer') {
    const userSenderAmount  = await this.statementsRepository.getUserBalance({user_id: sender_id as string, with_statement: false});
    if (amount > userSenderAmount.balance) {
      throw new CreateTransferError.InsufficientFunds()
    }
    //}
    console.log('userSenderAmount')
    console.log(userSenderAmount)

    const statementSender = await this.statementsRepository.create({
        user_id: sender_id,
        sender_id: sender_id,
        amount,
        description,
        type: OperationType.WITHDRAW
    })
    console.log('statementSender')
    console.log(statementSender)

    const transferOperation = await this.statementsRepository.create({
        user_id: receiverUser.id,
        sender_id: userSender.id,
        amount,
        description,
        type,
    })
    console.log('transferOperation===================')
    console.log(transferOperation)

    return transferOperation;
  }

}
