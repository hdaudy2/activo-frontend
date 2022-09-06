import { COITemplatePage } from './app.po';

describe('COI App', function() {
  let page: COITemplatePage;

  beforeEach(() => {
    page = new COITemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
