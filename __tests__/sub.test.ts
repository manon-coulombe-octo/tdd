import sub from '../src/sub'

describe('sub', () => {
  describe("exaggerate", () => {
    test("add '!' to the end the designated number times", () => {
      expect(sub.exaggerate('Yippee', 8)).toBe('Yippee!!!!!!!!')
    })
  })

  describe('calculate', () => {
    test("return 4", () => {
      expect(sub.calculate()).toEqual(4)
    })
  })
})


