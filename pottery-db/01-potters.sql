DROP TABLE IF EXISTS potters;

CREATE TABLE potters (
    potters_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    firstname TEXT NOT NULL,
    lastname TEXT NOT NULL,
    password TEXT NOT NULL,
    studio_postcode TEXT NOT NULL
);

INSERT INTO potters (username, firstname, lastname, password, studio_postcode) VALUES
('KJones', 'Keith', 'Jones', 'test', 'CT5'),
('RichM', 'Rich', 'Miller', 'test', 'CR3');

