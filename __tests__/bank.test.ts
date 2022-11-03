import Account from '../src/bank'
import bank from '../src/bank'

describe('bank', () => {
    describe('Account', () => {
        let account
        let actualBalance
        let expectedBalance

        test('quand je crée le compte, le solde est à 0', () => {
            //given
            //when
            account = new Account()
             //then
            actualBalance = account.getBalance()
            expectedBalance = 0

            expect(actualBalance).toEqual(expectedBalance)
        })

        test('je peux consulter le solde du copmpte', () => {
            //given
            account = new Account()
            account._balance = 5
            //when
            actualBalance = account.getBalance()
            //then
            expectedBalance = 5

            expect(actualBalance).toBe(expectedBalance)
        })

        test('je peux déposer de l\'argent sur le compte', () => {
            //given
            account = new Account()
            account._balance = 0
            //when
             account.cashDeposit(200)
            //then
            actualBalance = account.getBalance()
            expectedBalance = 200

            expect(actualBalance).toBe(expectedBalance)
        })

        test('je ne peux pas deposer d\'argent avec un montant negatif', () => {
            //given
            account = new Account()
            account._balance = 100

            //when then
            let error = 'Opération impossible, veuillez entrer un montant positif'
            
            expect(account.cashDeposit(-50)).toBe(error)

            actualBalance = account.getBalance()
            expectedBalance = 100

            expect(actualBalance).toBe(expectedBalance)
        })

        test('je peux retirer de l\'argent', () => {
            //given
            account = new Account()
            account._balance = 500
            //when
            account.cashWithdrawal(100)
            //then
            actualBalance = account.getBalance()
            expectedBalance = 400

            expect(actualBalance).toBe(expectedBalance)
        })
    })
})