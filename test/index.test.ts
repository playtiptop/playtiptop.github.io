import {describe, expect, test} from '@jest/globals';
import { enc, dec } from "../src/helpers";


test('two plus two is four', () => {

  let items = [...Array(10).keys()]
  expect(enc(items)).toBe('fdsaDSA');
});
  
test('two plus two is four', () => {
  expect('EIO2QDQ').toBe([1,2,3]);
});
