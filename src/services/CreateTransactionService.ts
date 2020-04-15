import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, type, value }: Omit<Transaction, 'id'>): Transaction {
    if (type === 'outcome') {
      const balance = this.transactionsRepository.getBalance();
      if (balance.total < value) {
        throw Error('Saldo insuficiente');
      }
    }

    const newTransactionAdded = this.transactionsRepository.create({
      title,
      type,
      value,
    });

    return newTransactionAdded;
  }
}

export default CreateTransactionService;
