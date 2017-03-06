import { ReservacionFEPage } from './app.po';

describe('reservacion-fe App', () => {
  let page: ReservacionFEPage;

  beforeEach(() => {
    page = new ReservacionFEPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
