import kata from '../src/kata'

describe('kata', () => {
    describe("calculateTotalPrice", () => {
        let listOfBooks: object
        let expectedPrice: number
        let actualPrice: number

        test("the price for 1 book is 8 euros", () => {
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

        test("the price for 2 same books is 16 euros", () => {
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

        test("the price for 2 different books is 15,20 euros", () => {
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

        test("the price for 3 different books is 21,60 euros", () => {
            listOfBooks = {
                tome1: 0,
                tome2: 1,
                tome3: 1,
                tome4: 1,
                tome5: 0
            }
            expectedPrice = 21.6
            actualPrice = kata.calculateTotalPrice(listOfBooks)

            expect(actualPrice).toEqual(expectedPrice)
        })

        test("the price for 4 different books is 27,20 euros", () => {
            listOfBooks = {
                tome1: 1,
                tome2: 1,
                tome3: 1,
                tome4: 1,
                tome5: 0
            }
            expectedPrice = 27.2
            actualPrice = kata.calculateTotalPrice(listOfBooks)

            expect(actualPrice).toEqual(expectedPrice)
        })

        test("the price for 5 different books is 32 euros", () => {
            listOfBooks = {
                tome1: 1,
                tome2: 1,
                tome3: 1,
                tome4: 1,
                tome5: 1
            }
            expectedPrice = 32
            actualPrice = kata.calculateTotalPrice(listOfBooks)

            expect(actualPrice).toEqual(expectedPrice)
        })

        test("the price for 3 books including 2 differents is 22,80 euros", () => {
            listOfBooks = {
                tome1: 0,
                tome2: 2,
                tome3: 1,
                tome4: 0,
                tome5: 0
            }
            expectedPrice = 22.8
            actualPrice = kata.calculateTotalPrice(listOfBooks)

            expect(actualPrice).toEqual(expectedPrice)
        })


        test("the price for 6 books including 3 differents is 43,20 euros", () => {
            listOfBooks = {
                tome1: 2,
                tome2: 2,
                tome3: 2,
                tome4: 0,
                tome5: 0
            }
            expectedPrice = 43.2
            actualPrice = kata.calculateTotalPrice(listOfBooks)

            expect(actualPrice).toEqual(expectedPrice)
        })
    })
})