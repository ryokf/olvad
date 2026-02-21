const getAllCategories = async () => {
    const data = await fetch('http://localhost:4000/category');
    const categories = await data.json();

    return categories;
};

export { getAllCategories };
