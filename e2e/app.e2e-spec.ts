import { Angular4AdminPage } from './app.po';

describe('angular4-admin App', () => {
  let page: Angular4AdminPage;

  beforeEach(() => {
    page = new Angular4AdminPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
