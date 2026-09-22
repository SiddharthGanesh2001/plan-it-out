package com.example.plainitoutserverside.model;

import java.time.LocalDateTime;

public class ChatMessage {
    private int messageId;
    private int eventId;
    private int userId;
    private String userName;
    private String content;
    private LocalDateTime createdAt;

    public ChatMessage(int messageId, int eventId, int userId, String userName, String content, LocalDateTime createdAt) {
        this.messageId = messageId;
        this.eventId = eventId;
        this.userId = userId;
        this.userName = userName;
        this.content = content;
        this.createdAt = createdAt;
    }

    public int getMessageId() {
        return messageId;
    }

    public int getEventId() {
        return eventId;
    }

    public int getUserId() {
        return userId;
    }

    public String getUserName() {
        return userName;
    }

    public String getContent() {
        return content;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}
