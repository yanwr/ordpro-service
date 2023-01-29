import axios from 'axios';

axios.defaults.validateStatus = () => true;

test('should NOT be able to create a order with invalid cpf', async function() {
    const request  = {
        cpf: '123.984.222-09'
    };

    const response = await axios.post('http://localhost:3000/checkout', request);
    expect(response.status).toBe(422);
    expect(response.data.message).toBe('Invalid cpf');
});

test('should be able to create a order with 3 products', async function() {
    const request = {
        cpf: '129.843.229-40',
        items: [
            { id: 1, quantity: 1 },
            { id: 2, quantity: 1 },
            { id: 3, quantity: 3 }
        ]
    };

    const response = await axios.post('http://localhost:3000/checkout', request);
    expect(response.data.total).toBe(6090);
});

test('should NOT be able to create a order with does not exist product', async function() {
    const request = {
        cpf: '129.843.229-40',
        items: [
            { id: 5, quantity: 1 },
        ]
    };

    const response = await axios.post('http://localhost:3000/checkout', request);
    expect(response.status).toBe(422);
    expect(response.data.message).toBe('Product not found');
});

test('should be able to create a order with 3 products and with coupon', async function() {
    const request = {
        cpf: '129.843.229-40',
        items: [
            { id: 1, quantity: 1 },
            { id: 2, quantity: 1 },
            { id: 3, quantity: 3 }
        ],
        coupon: 'VALE20'
    };

    const response = await axios.post('http://localhost:3000/checkout', request);
    expect(response.data.total).toBe(4872);
});