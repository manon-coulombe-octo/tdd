var errorMessage: string = 'Opération impossible, veuillez entrer un montant positif'
var successMessage: string = 'Opération effectuée avec succès'

interface Transaction {
    date: string;
    amount: number;
    newBalance: number;
  }

export default interface Horloge {

}

class Account {
    private _balance: number
    private _transactionList: Array<Transaction>

    constructor() {
        this._balance = 0
        this._transactionList = []
    }

    checkBalance(): number {
        return this._balance
    }

    cashDeposit(amount: number): string {
        if (amount <= 0) {
            return errorMessage
        }

        this._balance += amount
        const dateOftransaction = new Date()
        const newTransaction: Transaction = {
            date: dateOftransaction.toLocaleString() + '.' + dateOftransaction.getMilliseconds(), 
            amount: amount, 
            newBalance: this._balance
        }

        this._transactionList.push(newTransaction)
        return successMessage
    }

    cashWithdrawal(amount: number): string {
        if (amount <= 0) {
            return errorMessage
        }
        this._balance -= amount
        const dateOftransaction = new Date()
        const newTransaction: Transaction = {
            date: dateOftransaction.toLocaleString() + '.' + dateOftransaction.getMilliseconds(), 
            amount: -amount, 
            newBalance: this._balance
        }

        this._transactionList.push(newTransaction)
        return successMessage
    }

    getTransactionList() {
        return this._transactionList
    }
}

export default Account