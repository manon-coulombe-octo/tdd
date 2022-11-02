import kata from '../src/kata'

describe('kata', () => {
    describe("calculateTotalPrice", () => {
        let listOfBooks
        let expectedPrice
        let actualPrice

        test("the price for one book is 8 euros", () => {
            listOfBooks = {
                tome1: 1,
                tome2: 0,
                tome3: 0,
                tome4: 0,
                tome5: 0
            }
            expectedPrice = 8
            actualPrice = kata.calculateTotalPrice(listOfBooks)

            expect(actualPrice).toEqual(expectedPrice)
        })

        test("the price for two same books is 16 euros", () => {
            listOfBooks = {
                tome1: 0,
                tome2: 0,
                tome3: 0,
                tome4: 2,
                tome5: 0
            }
            expectedPrice = 16
            actualPrice = kata.calculateTotalPrice(listOfBooks)
            
            expect(actualPrice).toEqual(expectedPrice)
        })

        test("the price for two different books is 15,20 euros", () => {
            listOfBooks = {
                tome1: 0,
                tome2: 1,
                tome3: 0,
                tome4: 1,
                tome5: 0
            }
            expectedPrice = 15.2
            actualPrice = kata.calculateTotalPrice(listOfBooks)

            expect(actualPrice).toEqual(expectedPrice)
        })
    })
})