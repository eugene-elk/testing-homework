import {ExampleStore} from "../../src/server/data";
import express, {json} from "express";
import {getBugId} from "../../src/server/routes";

describe('Продукты:', () => {

  // BUG_ID=1 npm run test:unit
  it('Корректное получение списка всех продуктов', () => {
    const store = new ExampleStore(true);

    const mockedData =  [
      { id: 0, name: 'item 0', price: 12300 },
      { id: 1, name: 'item 1', price: 12300 },
      { id: 2, name: 'item 2', price: 12300 }
    ]

    const result = store.getAllProducts(getBugId());

    expect(result).toStrictEqual(mockedData);
  });
});