import SomeClass from './SomeClass';
import { expect } from 'chai';

describe('Hello function', () => {
  it('should return hello world', () => {
    const result = SomeClass.jsGreet('world');
    expect(result).to.equal('Howdy, world!');
  });
});