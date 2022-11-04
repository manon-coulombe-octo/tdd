const calculateTotalPrice = (listOfBooks: object): number => {
    const bookPrice: number = 8

    let numberOfBooks: number = 0
    let discount: number = 0
    let numberOfDifferentBooks: number = 0
    let result: number = 0
    
    for (var tome in listOfBooks) {
        numberOfBooks += listOfBooks[tome]
        if (listOfBooks[tome] != 0) {
            numberOfDifferentBooks++
        }
    }
    
    switch (numberOfDifferentBooks) {
        case 2:
            discount = 0.05
            break
        case 3:
            discount = 0.1
            break
        case 4:
            discount = 0.15
            break
        case 5:
            discount = 0.2
            break
    }
            
    result = bookPrice * numberOfBooks * (1 - discount)
    result = Math.round(result * 100) / 100

    return result
}


export default {
    calculateTotalPrice,
  }