DROP TABLE IF EXISTS owners;

CREATE TABLE owners (
    owners_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    firstname TEXT NOT NULL,
    lastname TEXT NOT NULL,
    password TEXT NOT NULL,
    postcode TEXT NOT NULL
);

INSERT INTO owners (username, firstname, lastname, password, postcode) VALUES
('K8K8', 'Kiki', 'Wan', 'test', 'N17');