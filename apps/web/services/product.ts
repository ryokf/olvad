const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

const getAllProduct = async () => {
    const data = await fetch(`${API_BASE_URL}/product`);
    const products = await data.json();

    return products;
};

const getProductById = async (id: number) => {
    const data = await fetch(`${API_BASE_URL}/product/${id}`);
    const product = await data.json();

    return product;
};

export { getAllProduct, getProductById };
