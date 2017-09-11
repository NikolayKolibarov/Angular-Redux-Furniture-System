import { FurnitureSystemPage } from './app.po';

describe('furniture-system App', () => {
  let page: FurnitureSystemPage;

  beforeEach(() => {
    page = new FurnitureSystemPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
