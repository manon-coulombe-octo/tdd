import {Account, Horloge, ServiceTransferApi, Transfer} from '../src/bank'

class HorlogeTest implements Horloge {
    private _date: string

    setDate(date: string) {
        this._date = date
    }

    getDate(): string {
        return this._date ? this._date : "04/11/2022, 16:33:04.167"
    }
}

class ServiceTransferApiTest implements ServiceTransferApi {
    sendMoney(info: Transfer): string {
        return 'HTTP_CODE 202'
    }
}

describe('bank', () => {
    const horloge = new HorlogeTest()
    const transferApi = new ServiceTransferApiTest()
    describe('Account', () => {
        let account
        let actualBalance: number
        let expectedBalance: number

        describe('Create account', () => {
            test('quand je crée le compte, le solde est à 0', () => {
                //given
                //when
                account = new Account(horloge, transferApi)
                 //then
                actualBalance = account.checkBalance()
                expectedBalance = 0
    
                expect(actualBalance).toEqual(expectedBalance)
            })
        })

        describe('Check balance', () => {
            test('je peux consulter le solde du copmpte', () => {
                //given
                account = new Account(horloge, transferApi)
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
                account = new Account(horloge, transferApi)
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
                account = new Account(horloge, transferApi)
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
                account = new Account(horloge, transferApi)
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
                account = new Account(horloge, transferApi)
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
            test('je peux consulter la liste des transactions', () => {
                //given
                account = new Account(horloge, transferApi)
                account.cashDeposit(250)
                const newBalance1 = account.checkBalance()
                const date1 = horloge.getDate()
                horloge.setDate("07/11/2022, 13:33:04.167")
                const date2 = horloge.getDate()
                account.cashWithdrawal(60)
                const newBalance2 = account.checkBalance()
                //when
                const actualList = account.getTransactionList()
                //then
                const expectedList = [
                    {
                        date: date1,
                        amount: 250,
                        newBalance: newBalance1
                    },
                    {
                        date: date2,
                        amount: -60,
                        newBalance: newBalance2
                    },
                ]
                expect(actualList).toEqual(expectedList)
                expect(expectedList[0].date).not.toEqual(expectedList[1].date)
            })
        })

        describe('Cash transfer', () => {
            test('On peut transférer de l\'argent vers un compte extérieur', () => {
                //given
                account = new Account(horloge, transferApi)
                account._balance = 600
                const webService = new ServiceTransferApiTest()
                const ibanFrom = "FRC"
                const ibanTo = "MACO"
                const amountToSend = 50
                //when
                account.sendMoney(ibanTo, amountToSend)
                const requestParam = {ibanFrom: ibanFrom, ibanTo: ibanTo, amount: amountToSend}
                const request = webService.sendMoney(requestParam)

                //then
                const expectedBalance = 550
                expect(request).toBe("HTTP_CODE 202")
                expect(account.checkBalance()).toBe(expectedBalance)
            })
        })
    })
})