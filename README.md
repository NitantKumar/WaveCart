# WaveCart

WaveCart is an e-commerce application that provides users with a seamless shopping experience. With features like Firebase Authentication for secure user login/signup, categorized product browsing, sorting, pagination, and a responsive design, WaveCart ensures a smooth and engaging shopping journey.

## Demo

Explore the live demo here: [WaveCart](https://wavecart-rho.vercel.app/)

## Features

- **User Authentication**: Sign up and login functionalities powered by Firebase Auth.
- **Product Browsing**: Users can explore products across multiple categories, view product details, and add items to their cart.
- **Category Filtering**: Browse products by category with options for sorting and pagination.
- **Sorting & Pagination**: Easily sort products by price, rating, or discount in ascending or descending order and navigate through pages of results.
- **Responsive Design**: Optimized for various screen sizes using Tailwind CSS.
- **Dynamic Cart Functionality**: Add items to the cart, update quantities, and view the total price.
- **State Management**: Managed using Redux Toolkit for efficient global state control.

## Tech Stack

- **React**: Frontend framework for UI components.
- **Vite**: Fast development server and build tool.
- **Redux Toolkit**: State management for handling user and product data.
- **Firebase Authentication**: Secure login and signup functionalities.
- **Tailwind CSS**: Styling framework for a responsive and visually appealing UI.
- **React Router**: Navigation and routing in the app.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/wavecart.git
    cd wavecart
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up Firebase:
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
   - Enable Email/Password Authentication.
   - Add your Firebase configuration to a `.env` file:
    ```env
    VITE_FIREBASE_API_KEY=your_api_key
    VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
    VITE_FIREBASE_PROJECT_ID=your_project_id
    ```

4. Start the development server:
    ```bash
    npm run dev
    ```

## Usage

1. **Sign Up / Login**:
   - Register a new account or sign in using your email and password.
   - Firebase Authentication securely manages login/signup processes.

2. **Browse Categories**:
   - Explore products organized by categories. Click on any category to view products within that category.
   - Sorting and pagination allow users to find products based on preferences like price, rating, and discounts.

3. **Sort and Filter Products**:
   - Use the sorting dropdown to sort products by price (low to high/high to low), rating, or discounts.
   - Paginate through the products list for better navigation.

4. **Add Products to Cart**:
   - Add products to the cart. The cart dynamically updates the quantity and total price.

5. **Responsive Design**:
   - The application is fully responsive, ensuring an optimal user experience on desktops, tablets, and mobile devices.

## Key Components

### Categories
- Browse products by categories with support for sorting and pagination. Users can switch between categories to explore specific product types.

### Cart
- View and manage items added to the cart, with options to update quantities or remove products.

### Product List
- Displays all products with information like price, rating, and discount.

### Pagination
- Navigate through multiple pages of products seamlessly.

### Sorting
- Sort products by price, rating, or discounts in ascending or descending order.

## License

This project is licensed under [The Unlicense](http://unlicense.org/), allowing you to use and modify the code freely.
