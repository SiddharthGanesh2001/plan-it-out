package com.example.plainitoutserverside.model;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

public class User implements UserDetails {
    private int userId;
    private String userEmail;
    private String userName;
    private String password;
    private String role;

    // Constructor for auth (with password)
    public User(int userId, String userEmail, String userName, String password, String role) {
        this.userId = userId;
        this.userEmail = userEmail;
        this.userName = userName;
        this.password = password;
        this.role = role;
    }

    // Constructor for public responses (without password)
    public User(int userId, String userEmail, String userName) {
        this.userId = userId;
        this.userEmail = userEmail;
        this.userName = userName;
    }

    // UserDetails interface implementations
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + (role != null ? role : "USER")));
    }

    @Override
    public String getUsername() {
        return userEmail;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    // Getters and setters
    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
