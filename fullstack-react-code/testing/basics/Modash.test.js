// We write the tests for the Modash library in
// this file in the Unit Testing chapter
import Modash from './Modash'

function assertEqual(description, actual, expected) {
  if (actual === expected) {
    console.log(`[PASS] ${description}`)
  } else {
    console.error(`[FAIL] ${description}`)
    console.error(`\tactual: '${actual}'`)
    console.error(`\texpected: '${expected}'`)
  }
}
let string = 'there was one catch, and that was CATCH-22'
let actual = Modash.truncate(string, 19)
let expected = 'there was one catch...'
assertEqual('`truncate()`: truncates a string', actual, expected)

actual = Modash.truncate(string, string.length)
expected = string
assertEqual('`truncate()`: no-ops if <= length', actual, expected)

actual = Modash.capitalize(string)
expected = 'There was one catch, and that was catch-22'
assertEqual('`capitalize()`: capitalizes the string', actual, expected)

string = 'customer responded at'
actual = Modash.camelCase(string)
expected = 'customerRespondedAt'
assertEqual('`camelCase()`: string with spaces', actual, expected)

string = 'customer_responded_at'
actual = Modash.camelCase(string)
expected = 'customerRespondedAt'
assertEqual('`camelCase()`: string with underscores', actual, expected)