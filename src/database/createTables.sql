create table subscriptions (
    id SERIAL,
    subscription_date TIMESTAMP,
    name VARCHAR(50) NOT NULL,
    last_message INT,
    active BOOLEAN,
    PRIMARY KEY (id),
    UNIQUE KEY (name)
);

create table message_flow (
    id SERIAL,
    template_name TEXT,
    position INTEGER,
    PRIMARY KEY (id),
    UNIQUE KEY position
);