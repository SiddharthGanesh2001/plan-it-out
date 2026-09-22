package com.example.plainitoutserverside.repository;

import com.example.plainitoutserverside.model.User;

import java.sql.*;
import java.util.Optional;

public class UserRepo {

    private final String url;
    private final String username;
    private final String password;

    public UserRepo(String url, String username, String password) {
        this.url = url;
        this.username = username;
        this.password = password;
    }

    private Connection getConnection() throws SQLException {
        return DriverManager.getConnection(url, username, password);
    }

    public Optional<User> findByEmail(String email) {
        String sql = "SELECT * FROM User WHERE user_email = ?";
        try (Connection connection = getConnection();
             PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setString(1, email);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                return Optional.of(new User(
                        rs.getInt("user_id"),
                        rs.getString("user_email"),
                        rs.getString("user_name"),
                        rs.getString("password"),
                        rs.getString("role")
                ));
            }
        } catch (SQLException e) {
            System.err.println("Database error: " + e.getMessage());
        }
        return Optional.empty();
    }

    public boolean existsByEmail(String email) {
        String sql = "SELECT COUNT(*) FROM User WHERE user_email = ?";
        try (Connection connection = getConnection();
             PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setString(1, email);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                return rs.getInt(1) > 0;
            }
        } catch (SQLException e) {
            System.err.println("Database error: " + e.getMessage());
        }
        return false;
    }

    public User save(String email, String userName, String hashedPassword) {
        String sql = "INSERT INTO User (user_email, user_name, password, role) VALUES (?, ?, ?, 'USER')";
        try (Connection connection = getConnection();
             PreparedStatement stmt = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            stmt.setString(1, email);
            stmt.setString(2, userName);
            stmt.setString(3, hashedPassword);
            stmt.executeUpdate();

            ResultSet generatedKeys = stmt.getGeneratedKeys();
            if (generatedKeys.next()) {
                int userId = generatedKeys.getInt(1);
                return new User(userId, email, userName);
            }
        } catch (SQLException e) {
            System.err.println("Database error: " + e.getMessage());
        }
        return null;
    }
}
