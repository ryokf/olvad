const getAllProduct = async () => {
    const data = await fetch('http://localhost:4000/product');
    const products = await data.json();

    return products;
};

export { getAllProduct };
