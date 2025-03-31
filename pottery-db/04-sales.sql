DROP TABLE IF EXISTS sales;

CREATE TABLE sales (
    sale_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    sale_time TEXT NOT NULL,
    sale_number INT NOT NULL,
    total_sales INT DEFAULT 0,
    ceramic_item_id INT REFERENCES ceramics (ceramics_id),
    ceramic_item_purchaser_id INT REFERENCES owners (owners_id)
);

INSERT INTO sales (sale_time, sale_number, ceramic_item_id, ceramic_item_purchaser_id) VALUES
('2025-02-25', 1, 1, 1),
('2025-02-24', 2, 1, 1),
('2025-02-27', 1, 2, 1),
('2025-02-28', 1, 3, 1),
('2025-03-21', 1, 3, 1),
('2025-02-25', 1, 4, 1),
('2025-02-25', 5, 2, 1),
('2025-02-25', 3, 2, 1),
('2025-02-25', 2, 5, 1),
('2025-02-25', 1, 1, 1),
('2025-02-25', 2, 1, 1);

