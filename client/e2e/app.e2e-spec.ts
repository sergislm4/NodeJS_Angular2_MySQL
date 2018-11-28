import { App_test } from './app.po';

describe('ng-demo App', () => {
  let page: App_test;

  beforeEach(() => {
    page = new App_test();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toContain('conduit');
  });
});
