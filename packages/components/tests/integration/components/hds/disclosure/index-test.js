import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {
  click,
  triggerEvent,
  triggerKeyEvent,
  render,
  resetOnerror,
} from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hds/disclosure/index', function (hooks) {
  setupRenderingTest(hooks);

  hooks.afterEach(() => {
    resetOnerror();
  });

  test('it should render with a CSS class that matches the component name', async function (assert) {
    await render(hbs`<Hds::Disclosure id="test-disclosure" />`);
    assert.dom('div#test-disclosure').hasClass('hds-disclosure');
  });

  // TOGGLE + CONTENT

  test('it should render the "toggle" block but not the "content', async function (assert) {
    assert.expect(3);
    await render(hbs`
      <Hds::Disclosure>
        <:toggle>
          <button type="button" id="test-disclosure-button" />
        </:toggle>
      </Hds::Disclosure>
    `);
    assert.dom('.hds-disclosure__toggle').exists();
    assert.dom('button#test-disclosure-button').exists();
    assert.dom('.hds-disclosure__content').doesNotExist();
  });
  test('it should render the "content" when the "toggle" is clicked', async function (assert) {
    assert.expect(2);
    await render(hbs`
      <Hds::Disclosure>
        <:toggle as |t|>
          <button type="button" id="test-disclosure-button" {{on "click" t.onClickToggle}} />
        </:toggle>
        <:content>
          <a id="test-disclosure-link" href="#">test</a>
        </:content>
      </Hds::Disclosure>
    `);
    await click('button#test-disclosure-button');
    assert.dom('.hds-disclosure__content').exists();
    assert.dom('a#test-disclosure-link').exists();
  });

  // ESCAPE KEY

  test('it should hide the "content" when the "toggle" is deactivated via "Escape"', async function (assert) {
    assert.expect(4);
    await render(hbs`
      <Hds::Disclosure id="test-disclosure">
        <:toggle as |t|>
          <button type="button" id="test-disclosure-button" {{on "click" t.onClickToggle}} />
        </:toggle>
        <:content>
          <a id="test-disclosure-link" href="#">test</a>
        </:content>
      </Hds::Disclosure>
    `);
    await click('button#test-disclosure-button');
    assert.dom('.hds-disclosure__content').exists();
    assert.dom('a#test-disclosure-link').exists();
    await triggerKeyEvent('#test-disclosure', 'keyup', 'Escape');
    assert.dom('.hds-disclosure__content').doesNotExist();
    assert.dom('a#test-disclosure-link').doesNotExist();
  });

  // FOCUS OUT

  test('it should hide the "content" when the focus is moved outside', async function (assert) {
    assert.expect(4);
    await render(hbs`
      <Hds::Disclosure id="test-disclosure">
        <:toggle as |t|>
          <button type="button" id="test-disclosure-button" {{on "click" t.onClickToggle}} />
        </:toggle>
        <:content>
          <a id="test-disclosure-link" href="#">test</a>
        </:content>
      </Hds::Disclosure>
    `);
    await click('button#test-disclosure-button');
    assert.dom('.hds-disclosure__content').exists();
    assert.dom('a#test-disclosure-link').exists();
    await triggerEvent('#test-disclosure', 'focusout');
    assert.dom('.hds-disclosure__content').doesNotExist();
    assert.dom('a#test-disclosure-link').doesNotExist();
  });

  // CLOSE DISCLOSED CONTENT ON CLICK

  test('it should hide the "content" when an interactive element triggers `close`', async function (assert) {
    assert.expect(4);
    await render(hbs`
      <Hds::Disclosure id="test-disclosure">
        <:toggle as |t|>
          <button type="button" id="test-disclosure-button" {{on "click" t.onClickToggle}} />
        </:toggle>
        <:content as |c|>
          <a id="test-disclosure-link" href="#" {{on "click" c.close}}>test</a>
        </:content>
      </Hds::Disclosure>
    `);
    await click('button#test-disclosure-button');
    assert.dom('.hds-disclosure__content').exists();
    assert.dom('a#test-disclosure-link').exists();
    await click('a#test-disclosure-link');
    assert.dom('.hds-disclosure__content').doesNotExist();
    assert.dom('a#test-disclosure-link').doesNotExist();
  });
});
