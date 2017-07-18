import Modash from './Modash'

describe('Modash', () => {
  describe('`truncate()`', () => {
    const string = 'there was one catch, and that was CATCH-22'
    it('truncates a string', () => {
      expect(
        Modash.truncate(string, 19)
      ).toEqual('there was one catch...')
    })

    it('no-ops if <= length', () => {
      expect(
        Modash.truncate(string, string.length)
      ).toEqual(string)
    })
  })

  describe('`capitalize()`', () => {
    const string = 'there was one catch, and that was CATCH-22'
    it('capitalizes the string', () => {
      expect(
        Modash.capitalize(string)
      ).toEqual('There was one catch, and that was catch-22')
    })
  })
  describe('`camelCase()`', () => {
    const result = 'customerRespondedAt'
    it('string with spaces', () => {
      const spaces = 'customer responded at'
      expect(
        Modash.camelCase(spaces)
      ).toEqual(result)
    })
    it('string with underscores', () => {
      const underscores = 'customer_responded_at'
      expect(
        Modash.camelCase(underscores)
      ).toEqual(result)
    })
  })
})
