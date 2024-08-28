# CQRS Project

This project implements a CQRS (Command Query Responsibility Segregation) pattern using Node.js, Express, and Mongoose

## Table of Contents

- [CQRS Project](#cqrs-project)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Key Directories](#key-directories)

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/mavannkas/cqrs.git
    cd cqrs
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Copy the `.env-template` to `.env` and fill in the required environment variables:
    ```sh
    cp .env-template .env
    ```

## Usage

Start the development server:
```sh
npm run start
```

## Key Directories
* src/exceptions: Custom exception classes.
* src/middlewares: Middleware for handling events and validation.
* src/orders: Order-related commands, controllers, models, and routes.
* src/products: Product-related commands, controllers, models, and routes.
