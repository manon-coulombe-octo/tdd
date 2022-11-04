var errorMessage: string = 'Opération impossible, veuillez entrer un montant positif'
var successMessage: string = 'Opération effectuée avec succès'

interface Transaction {
    date: string,
    amount: number,
    newBalance: number
  }
export interface Transfer {
    ibanFrom: string
    ibanTo: string
    amount: number
  }

export interface Horloge {
    getDate(): string
}

export interface ServiceTransferApi {
    sendMoney(info: Transfer): string
}

class ServiceTransferApiProd implements ServiceTransferApi {
    sendMoney(info: Transfer): string {
        return 'HTTP_CODE 202'
    }
}

class HorlogeProd implements Horloge {
    getDate(): string {
        const dateOfToday = new Date()
        return dateOfToday.toLocaleString() + "." + dateOfToday.getMilliseconds()
    }
}

export class Account {
    private _balance: number
    private _iban: string
    private _transactionList: Array<Transaction>
    private _horloge: Horloge
    private _transferApi: ServiceTransferApi

    constructor(horloge: Horloge, transferApi: ServiceTransferApi) {
        this._balance = 0
        this._transactionList = []
        this._horloge = horloge
        this._iban = 'FR123456'
        this._transferApi = transferApi
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

    sendMoney(ibanTo, amount) {
        const infoToSend = {ibanFrom: this._iban, ibanTo: ibanTo, amount: amount}
        this._transferApi.sendMoney(infoToSend)
        this.cashWithdrawal(amount)
    }
}