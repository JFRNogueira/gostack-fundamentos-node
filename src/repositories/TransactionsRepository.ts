import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
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
    const incomeInicial = 0;
    const outcomeInicial = 0;

    const income = this.transactions.reduce((acumulador, valorAtual) => {
      if (valorAtual.type === 'income') return acumulador + valorAtual.value;
      return acumulador;
    }, incomeInicial);

    const outcome = this.transactions.reduce((acumulador, valorAtual) => {
      if (valorAtual.type === 'outcome') return acumulador + valorAtual.value;
      return acumulador;
    }, outcomeInicial);

    const total = income - outcome;

    const balance = {
      income,
      outcome,
      total,
    };

    return balance;
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
