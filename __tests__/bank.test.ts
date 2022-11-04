import {Account, Horloge} from '../src/bank'

class HorlogeTest implements Horloge {
    getDate(): string {
        return "04/11/2022, 10:36:50.102"
    }

}

describe('bank', () => {
    const horloge = new HorlogeTest()
    describe('Account', () => {
        let account
        let actualBalance: number
        let expectedBalance: number

        describe('Create account', () => {
            test('quand je crée le compte, le solde est à 0', () => {
                //given
                //when
                account = new Account(horloge)
                 //then
                actualBalance = account.checkBalance()
                expectedBalance = 0
    
                expect(actualBalance).toEqual(expectedBalance)
            })
        })

        describe('Check balance', () => {
            test('je peux consulter le solde du copmpte', () => {
                //given
                account = new Account(horloge)
                account._balance = 5
                //when
                actualBalance = account.checkBalance()
                //then
                expectedBalance = 5
    
                expect(actualBalance).toBe(expectedBalance)
            })
        })

        describe('Cash deposit', () => {
            test('je peux déposer de l\'argent sur le compte', () => {
                //given
                account = new Account(horloge)
                account._balance = 0
                const successMessage = 'Opération effectuée avec succès'
                //when
                const amount = 200
                const cashDeposit = account.cashDeposit(amount)
                //then
                actualBalance = account.checkBalance()
                expectedBalance = 200
                
                expect(actualBalance).toBe(expectedBalance)
                expect(cashDeposit).toBe(successMessage)

                const actualNewTransaction = account._transactionList[0]
                const expectedNewTransaction = {
                    date: horloge.getDate(),
                    amount: amount,
                    newBalance: expectedBalance
                }
                expect(actualNewTransaction).toEqual(expectedNewTransaction)
            })
            
            test('je ne peux pas deposer d\'argent avec un montant negatif', () => {
                //given
                account = new Account(horloge)
                account._balance = 100
                const errorMessage = 'Opération impossible, veuillez entrer un montant positif'
                //when 
                const cashDeposit = account.cashDeposit(-50)

                //then
                actualBalance = account.checkBalance()
                expectedBalance = 100

                expect(cashDeposit).toBe(errorMessage)
                expect(actualBalance).toBe(expectedBalance)
            })
        })

        describe('Money withdrawal', () => {
            test('je peux retirer de l\'argent', () => {
                //given
                account = new Account(horloge)
                account._balance = 500
                const successMessage = 'Opération effectuée avec succès'
                //when
                const amount = 100
                const cashWithdrawal = account.cashWithdrawal(amount)
                //then
                actualBalance = account.checkBalance()
                expectedBalance = 400
                
                expect(actualBalance).toBe(expectedBalance)
                expect(cashWithdrawal).toBe(successMessage)

                const actualNewTransaction = account._transactionList[0]
                const expectedNewTransaction = {
                    date: horloge.getDate(),
                    amount: -amount,
                    newBalance: expectedBalance
                }
                expect(actualNewTransaction).toEqual(expectedNewTransaction)
            })

            test('je ne peux pas retirer de l\'argent avec un montant négatif', () => {
                //given
                account = new Account(horloge)
                account._balance = 500
                const errorMessage = 'Opération impossible, veuillez entrer un montant positif'
                //when
                const cashWithdrawal = account.cashWithdrawal(-100)
                //then
                actualBalance = account.checkBalance()
                expectedBalance = 500
                
                expect(actualBalance).toBe(expectedBalance)
                expect(cashWithdrawal).toBe(errorMessage)
            })
        })

        describe('Get transaction list', () => {
            test('je peux consulter la liste des transactions', async () => {
                //given
                await new Promise(r => setTimeout(r, 1))
                account = new Account(horloge)
                account.cashDeposit(250)
                const newBalance1 = account.checkBalance()
                account.cashWithdrawal(60)
                const newBalance2 = account.checkBalance()
                //when
                const actualList = account.getTransactionList()
                //then
                const expectedList = [
                    {
                        date: horloge.getDate(),
                        amount: 250,
                        newBalance: newBalance1
                    },
                    {
                        date: horloge.getDate(),
                        amount: -60,
                        newBalance: newBalance2
                    },
                ]
                expect(actualList).toEqual(expectedList)
            })
        })
    })
})