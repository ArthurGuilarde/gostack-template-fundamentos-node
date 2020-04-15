import { uuid } from 'uuidv4';
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions
      .filter(types => types.type === 'income')
      .map(values => values.value)
      .reduce(
        (valueAccumulator, current): number => valueAccumulator + current,
        0,
      );
    const outcome = this.transactions
      .filter(types => types.type === 'outcome')
      .map(values => values.value)
      .reduce(
        (valueAccumulator, current): number => valueAccumulator + current,
        0,
      );

    const balance = {
      income,
      outcome,
      total: income - outcome,
    };

    return balance;
  }

  public create({ title, type, value }: Omit<Transaction, 'id'>): Transaction {
    const newTransactionAdded = {
      id: uuid(),
      title,
      type,
      value,
    };
    this.transactions.push(newTransactionAdded);
    return newTransactionAdded;
  }
}

export default TransactionsRepository;
