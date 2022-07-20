import { module, test } from 'qunit';
import { linkToQuery } from '@hashicorp/design-system-components/helpers/hds/link-to-query';

module('Unit | Helper | hds/link-to-query', function () {
  test('returns the same object that is passed as argument', async function (assert) {
    assert.deepEqual(linkToQuery(['test']), 'test');
  });
  test('returns an empty object if no argument is passed', async function (assert) {
    assert.deepEqual(linkToQuery([]), {});
  });
});
