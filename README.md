# Omni Store Project

## Overview
My first ever E-Commerce site, featuring a full-featured shopping experience with user authentication, product listings, shopping cart, wishlist, and responsive design.

## Features
- **User Authentication**
  - Secure user registration and login using JWT.

- **Product Listing**
  - Display a list of products with details such as name, description, price, and specifications.

- **Shopping Cart**
  - Add products to the cart and manage them.

- **Filters**
  - Filter products by various criteria to refine search results.

- **Wishlist**
  - Add products to a wishlist for future reference.

- **Responsive Design**
  - Optimized for desktop, tablet, and mobile devices to provide a seamless user experience.

## Installation

### Prerequisites

- Node.js
- npm or Yarn
- MongoDB

### Steps

1. **Clone the repository**:
    ```bash
    git clone https://github.com/Khemu1/Omni-Store-E-Commerce
    ```

2. **Navigate to the project directory**:
    ```bash
    cd Omni-Store-E-Commerce
    ```

3. **Install dependencies**:
    ```bash
    npm install
    ```
    
4. **Create a `.env` file in the root directory** and add the following environment variables:
    ```env
    MONGODB_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    ```

5. **Start the development server**:
    ```bash
    npm run dev
    ```

6. **Start the backend server**:
    ```bash
    npm run serve
    ```

7. **Access the application**:
   Open your browser and navigate to `http://localhost:5173`.

## Usage

### Running the project

1. Start the frontend development server
   ```bash
   npm run dev
2. Start the frontend development server
   ```bash
   npm run serve

## Technologies Used

### Frontend:
- **React:** A JavaScript library for building user interfaces.
- **TypeScript:** A typed superset of JavaScript that compiles to plain JavaScript.
- **Vite:** A fast build tool and development server for modern web projects.
- **Tailwind CSS:** A utility-first CSS framework for rapidly building custom user interfaces.

### Backend:
- **Node.js:** A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express:** A minimal and flexible Node.js web application framework.
- **MongoDB:** A NoSQL database for modern applications.
- **Mongoose:** An ODM (Object Data Modeling) library for MongoDB and Node.js.

### Other:
- **JWT (JSON Web Tokens):** Used for secure user authentication.
- **Redux:** A predictable state container for JavaScript apps.
- **Axios:** A promise-based HTTP client for making requests to the server.



Replace placeholders like `your_mongodb_uri`, `your_jwt_secret`, and `yourname@example.com` with your actual information. Adjust the sections and content as needed to fit your project details.

