import { commerce } from 'faker';
import { Order, Product, ProductShortInfo } from '../common/types';

const generateProducts = () => {
    const products: Product[] = []

    for(let id = 0; id < 27; id++) {
        products.push({
            id,
            name: `${commerce.productAdjective()} ${commerce.product()}`,
            description: commerce.productDescription(),
            price: Number(commerce.price()),
            color: commerce.color(),
            material: commerce.productMaterial(),
        });
    }

    return products;
}

const mockGenerateProducts = () => {
    const products: Product[] = [];

    for(let id = 0; id < 3; id++) {
        products.push({
            id,
            name: `item ${id}`,
            description: "mock description",
            price: 12300,
            color: "pink",
            material: "plastic"
        })
    }

    return products;
}

function getShortInfo({ id, name, price }: Product): ProductShortInfo {
    return { id, name, price };
}

export const SIZE = 200;

export class ExampleStore {
    private products: Product[];
    private readonly orders: (Order | { id: number })[] = [];

    constructor(mock?: boolean) {
        if (mock) {
            this.products = mockGenerateProducts();
        }
        else {
            this.products = generateProducts();
        }
    }


    getAllProducts(bugId: number): ProductShortInfo[] {
        const products = this.products.map(getShortInfo);

        if (bugId === 1) {
            products.forEach(p => { p.name = undefined });
        }

        return products;
    }

    getProductById(id: number): Product | undefined {
        const [product] = this.products.filter(p => p.id === id);
        return product;
    }

    createOrder(order: Order): number {
        const id = this.orders.length + 1;
        this.orders.push({ id, ...order });
        return id;
    }

    getLatestOrders() {
        return this.orders.slice(-SIZE);
    }
}
