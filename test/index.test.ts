import { describe, expect, test } from '@jest/globals'
import { enc, dec } from "../src/helpers"


test('two plus two is four', () => {
  let items = [...Array(10).keys()]
  expect(enc(items)).toEqual("AC6GCTQ")
});

test('two plus two is four', () => {
  let expected = [8, 9, 1, 0, 5, 7, 2, 3, 6, 4]
  let e = enc(expected)
  let actual = dec(e)
  console.log(actual)
  expect(actual).toEqual(expected)
})
