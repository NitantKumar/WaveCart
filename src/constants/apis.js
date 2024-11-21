const API_BASE_URL = 'https://dummyjson.com/products';

export const apiEndpoints = {
    // Products
    getAllProducts: (limit = 30, skip = 0, sortBy = '', order = 'asc') =>
        `${API_BASE_URL}?limit=${limit}&skip=${skip}${sortBy ? `&sortBy=${sortBy}&order=${order}` : ''}`,
    getSingleProduct: (id) => `${API_BASE_URL}/${id}`,
    searchProducts: (query) => `${API_BASE_URL}/search?q=${query}`,
    paginateProducts: (limit = 10, skip = 0, fields = '') =>
        `${API_BASE_URL}?limit=${limit}&skip=${skip}${fields ? `&select=${fields}` : ''}`,
    
    // Categories
    getAllCategories: `${API_BASE_URL}/categories`,
    getCategoryList: `${API_BASE_URL}/category-list`,
    getProductsByCategory: (categorySlug, limit = 30, skip = 0, sortBy = '', order = 'asc') =>
        `${API_BASE_URL}/category/${categorySlug}?limit=${limit}&skip=${skip}${sortBy ? `&sortBy=${sortBy}&order=${order}` : ''}`,

    // Simulated CRUD operations
    addProduct: `${API_BASE_URL}/add`,
    updateProduct: (id) => `${API_BASE_URL}/${id}`,
    deleteProduct: (id) => `${API_BASE_URL}/${id}`,
};

// Example fetch wrappers
export const fetchAllProducts = async (limit = 30, skip = 0, sortBy = '', order = 'asc') => {
    const response = await fetch(apiEndpoints.getAllProducts(limit, skip, sortBy, order));
    return response.json();
};

export const fetchSingleProduct = async (id) => {
    const response = await fetch(apiEndpoints.getSingleProduct(id));
    return response.json();
};

export const searchProducts = async (query) => {
    const response = await fetch(apiEndpoints.searchProducts(query));
    return response.json();
};

export const fetchPaginatedProducts = async (limit, skip, fields) => {
    const response = await fetch(apiEndpoints.paginateProducts(limit, skip, fields));
    return response.json();
};

export const fetchCategories = async () => {
    const response = await fetch(apiEndpoints.getAllCategories);
    return response.json();
};

export const fetchCategoryList = async () => {
    const response = await fetch(apiEndpoints.getCategoryList);
    return response.json();
};

export const fetchProductsByCategory = async (categorySlug, limit = 30, skip = 0, sortBy = '', order = 'asc') => {
    const response = await fetch(apiEndpoints.getProductsByCategory(categorySlug, limit, skip, sortBy, order));
    return response.json();
};

export const addProduct = async (productData) => {
    const response = await fetch(apiEndpoints.addProduct, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
    });
    return response.json();
};

export const updateProduct = async (id, updatedData) => {
    const response = await fetch(apiEndpoints.updateProduct(id), {
        method: 'PUT', // or 'PATCH'
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
    });
    return response.json();
};

export const deleteProduct = async (id) => {
    const response = await fetch(apiEndpoints.deleteProduct(id), {
        method: 'DELETE',
    });
    return response.json();
};
