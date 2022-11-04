var errorMessage: string = 'Opération impossible, veuillez entrer un montant positif'
var successMessage: string = 'Opération effectuée avec succès'

interface Transaction {
    date: string,
    amount: number,
    newBalance: number
  }

export interface Horloge {
    getDate(): string
}

class HorlogeProd implements Horloge{
    getDate(): string {
        const dateOfToday = new Date()
        return dateOfToday.toLocaleString() + "." + dateOfToday.getMilliseconds()
    }
}
export class Account {
    private _balance: number
    private _transactionList: Array<Transaction>
    private _horloge: Horloge

    constructor(horloge: Horloge) {
        this._balance = 0
        this._transactionList = []
        this._horloge = horloge
    }

    checkBalance(): number {
        return this._balance
    }

    cashDeposit(amount: number): string {
        if (amount <= 0) {
            return errorMessage
        }

        this._balance += amount
        const dateOftransaction = this._horloge.getDate()
        const newTransaction: Transaction = {
            date: dateOftransaction, 
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
        const dateOftransaction = this._horloge.getDate()
        const newTransaction: Transaction = {
            date: dateOftransaction, 
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