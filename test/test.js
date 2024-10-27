const assert = require('assert');
describe('Array', function () {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not available', function () {
         assert.equal([1, 2, 3].indexOf(4), -1);               // true
      // assert.equal([1, 2, 3].indexOf(1), -1);               // false
    });
  });
});