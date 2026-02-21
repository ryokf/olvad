const getAllProduct = async () => {
    const data = await fetch('http://localhost:4000/product');
    const products = await data.json();

    return products;
};

const getProductById = async (id: number) => {
    const convertedId = id.toString();
    console.log(convertedId);

    const data = await fetch(`http://localhost:4000/product/${convertedId}`);
    const product = await data.json();

    return product;
};

export { getAllProduct, getProductById };
