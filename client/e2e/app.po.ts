import { browser, element, by } from 'protractor';

export class App_test {
  navigateTo() {
    return browser.get('/');
  }

    getParagraphText() {
    return element(by.css('.logo-font')).getText();
  }
}
