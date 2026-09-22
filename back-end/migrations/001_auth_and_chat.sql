USE planItOutDB;

-- Phase 3 (auth): add password + role columns to User
ALTER TABLE User ADD COLUMN password VARCHAR(255) NOT NULL DEFAULT '';
ALTER TABLE User ADD COLUMN role VARCHAR(50) DEFAULT 'USER';

-- Phase 4 (chat): message history table
CREATE TABLE ChatMessage (
    message_id INT AUTO_INCREMENT PRIMARY KEY,
    event_id INT NOT NULL,
    user_id INT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES EventList(event_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES User(user_id)
);
