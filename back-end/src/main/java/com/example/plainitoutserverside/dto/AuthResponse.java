package com.example.plainitoutserverside.dto;

public class AuthResponse {
    private String token;
    private int userId;
    private String userName;
    private String userEmail;

    public AuthResponse(String token, int userId, String userName, String userEmail) {
        this.token = token;
        this.userId = userId;
        this.userName = userName;
        this.userEmail = userEmail;
    }

    public String getToken() {
        return token;
    }

    public int getUserId() {
        return userId;
    }

    public String getUserName() {
        return userName;
    }

    public String getUserEmail() {
        return userEmail;
    }
}
