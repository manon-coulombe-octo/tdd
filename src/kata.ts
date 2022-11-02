const calculateTotalPrice = (listOfBooks: object): number => {
    const bookPrice: number = 8

    let numberOfBooks: number = 0
    let discount: number = 1
    let numberOfDifferentBooks: number = 0
    let result: number = 0
    
    for (var tome in listOfBooks) {
        numberOfBooks += listOfBooks[tome]
        if (listOfBooks[tome] != 0) {
            numberOfDifferentBooks++
        }
    }
    
    if (numberOfDifferentBooks == 2) {
        discount = 0.95
    }

    result = bookPrice * numberOfBooks * discount

    return result
}


export default {
    calculateTotalPrice,
  }