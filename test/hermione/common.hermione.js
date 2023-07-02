describe('Общие требования', async function() {
  it('на ширине меньше 576px навигационное меню должно скрываться за "гамбургер"', async function () {
    const url = 'http://localhost:3000/hw/store/';
    await this.browser.setWindowSize(500, 600);
    await this.browser.url(url);
    await this.browser.assertView('plain', '.navbar');
  });
});