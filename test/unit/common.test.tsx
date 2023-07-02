import React from 'react';
import { render } from '@testing-library/react';
import events from '@testing-library/user-event';
import {Application} from "../../src/client/Application";
import {Provider} from "react-redux";
import {BrowserRouter, Router} from "react-router-dom";
import {initStore} from "../../src/client/store";
import {CartApi, ExampleApi} from "../../src/client/api";
import { createMemoryHistory } from 'history';

describe('Общие требования:', () => {
  it('в шапке - ссылка на главную страницу', () => {

    const basename = '/hw/store';

    const history = createMemoryHistory({
      initialEntries: [`${basename}/`],
    });

    const store = initStore(new ExampleApi(basename), new CartApi());

    const application = (
      <Router history={history}>
        <Provider store={store}>
          <Application />
        </Provider>
      </Router>
    );

    const { container } = render(application);

    const link = container
      .querySelector(".navbar-brand")
      .getAttribute("href");

    expect(link).toBe('/');
  });

  // BUG_ID=4 npm run test:unit
  it('при выборе элемента из меню "гамбургера" - закрытие меню', async () => {
    const event = events.setup();

    const basename = '/hw/store/catalog';

    const history = createMemoryHistory({
      initialEntries: [`${basename}/`],
    });

    const store = initStore(new ExampleApi(basename), new CartApi());

    const application = (
      <Router history={history}>
        <Provider store={store}>
          <Application />
        </Provider>
      </Router>
    );

    const { container } = render(application);

    const link = container.querySelector(".nav-link");
    const button_toggle = container.querySelector(".navbar-toggler");

    await event.click(button_toggle);
    await event.click(link);

    const menu = container.querySelector(".navbar-collapse");
    expect(menu.classList.contains('collapse')).toBe(true);
  });
});