class Account {
    _balance: number

    constructor() {
        this._balance = 0
    }

    getBalance() {
        return this._balance;
    }

    cashDeposit(value: number) {
        if (value <= 0) {
            return 'Opération impossible, veuillez entrer un montant positif'
        }
        else {
            this._balance += value
        }
    }

    cashWithdrawal(value: number) {
        this._balance -= value
    }
}

export default Account