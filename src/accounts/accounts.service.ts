import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Account } from './entities/account.entity';
import { AccountDocument } from './schema/account.schema';



@Injectable()
export class AccountsService {
  constructor(
    @InjectModel(Account.name) private accountModel: Model<AccountDocument>
  ) { }

  create(createAccountDto: CreateAccountDto) {
    // TODO: Check if account existed...

    const createdAccount = new this.accountModel(createAccountDto);
    return createdAccount.save();
  }

  async findAll(): Promise<Account[]> {
    return this.accountModel.find().exec();
  }

  async findOne(id: string) {
    return this.accountModel.findById(id);
  }

  update(id: string, updateAccountDto: UpdateAccountDto) {
    // TODO: check if id existed in body
    console.log(updateAccountDto);

    return this.accountModel.findByIdAndUpdate(id, updateAccountDto);
  }

  remove(id: string) {
    return this.accountModel.findByIdAndRemove(id);
  }
}
