CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'participant',
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE progress (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  workshop_id INTEGER NOT NULL,
  exercise_id VARCHAR(100) NOT NULL,
  completed BOOLEAN DEFAULT false,
  notes TEXT,
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, workshop_id, exercise_id)
);
