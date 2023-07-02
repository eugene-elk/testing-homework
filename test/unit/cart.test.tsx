import React from "react";
import { it, expect } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import {BrowserRouter, Router} from 'react-router-dom'
import { Provider } from 'react-redux'
import { Application } from '../../src/client/Application'
import { CartApi, ExampleApi } from '../../src/client/api';
import {addToCart, checkout, clearCart, initStore, productsLoad} from '../../src/client/store';
import { Product } from "../../src/common/types";
import { createMemoryHistory } from "history";

describe('Корзина:', () => {

  //BUG_ID=7 npm run test:unit
  it('Добавление двух элементов одного товара', () => {

    const basename = '/hw/store';
    const history = createMemoryHistory({
      initialEntries: [`${basename}/`],
    });

    const store = initStore(new ExampleApi(basename), new CartApi());

    const item: Product = {
      id: 1,
      name: 'item',
      price: 1,
      description: 'item description',
      material: 'item material',
      color: 'pink',
    };

    store.dispatch(addToCart(item));
    store.dispatch(addToCart(item));

    const application = (
      <Router history={history}>
        <Provider store={store}>
          <Application />
        </Provider>
      </Router>
    );

    const {container} = render(application);
    //screen.logTestingPlaygroundURL();

    const elem = screen.getByTestId('cart-link');

    //console.log(Object.keys(store.getState().cart));

    expect(Object.keys(store.getState().cart).length).toBe(1);
    expect(elem.textContent).toBe('Cart (1)');
  })

  it('Очистка корзины', () => {

    const basename = '/hw/store';
    const history = createMemoryHistory({
      initialEntries: [`${basename}/`],
    });

    const store = initStore(new ExampleApi(basename), new CartApi());

    store.dispatch(clearCart())

    const application = (
      <Router history={history}>
        <Provider store={store}>
          <Application />
        </Provider>
      </Router>
    );

    const {container} = render(application);

    const elem = screen.getByTestId('cart-link');
    expect(Object.keys(store.getState().cart).length).toBe(0);
    expect(elem.textContent).toBe('Cart');
  });
});