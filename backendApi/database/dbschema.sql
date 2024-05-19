CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE Orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    amount DECIMAL(10, 2) NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE Order_Chairs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    chair_id INT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES Orders(id),
    FOREIGN KEY (chair_id) REFERENCES Products(id)
);

CREATE TABLE Order_Tables (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    table_id INT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES Orders(id),
    FOREIGN KEY (table_id) REFERENCES Products(id)
);

CREATE TABLE Order_Tops (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    top_id INT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES Orders(id),
    FOREIGN KEY (top_id) REFERENCES Products(id)
);

CREATE TABLE Products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(255) NOT NULL
);
