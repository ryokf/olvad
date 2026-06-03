const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

const getAllCategories = async () => {
    const data = await fetch(`${API_BASE_URL}/category`);
    const categories = await data.json();

    return categories;
};

export { getAllCategories };
