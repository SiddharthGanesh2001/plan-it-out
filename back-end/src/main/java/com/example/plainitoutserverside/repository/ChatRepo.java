package com.example.plainitoutserverside.repository;

import com.example.plainitoutserverside.model.ChatMessage;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class ChatRepo {

    private final String url;
    private final String username;
    private final String password;

    public ChatRepo(String url, String username, String password) {
        this.url = url;
        this.username = username;
        this.password = password;
    }

    private Connection getConnection() throws SQLException {
        return DriverManager.getConnection(url, username, password);
    }

    public ChatMessage save(int eventId, int userId, String content) {
        String insertSql = "INSERT INTO ChatMessage (event_id, user_id, content) VALUES (?, ?, ?)";
        try (Connection connection = getConnection();
             PreparedStatement stmt = connection.prepareStatement(insertSql, Statement.RETURN_GENERATED_KEYS)) {
            stmt.setInt(1, eventId);
            stmt.setInt(2, userId);
            stmt.setString(3, content);
            stmt.executeUpdate();

            try (ResultSet generatedKeys = stmt.getGeneratedKeys()) {
                if (generatedKeys.next()) {
                    return findById(generatedKeys.getInt(1));
                }
            }
        } catch (SQLException e) {
            System.err.println("Database connection or query execution failed: " + e.getMessage());
        }
        return null;
    }

    private ChatMessage findById(int messageId) {
        String sql = "SELECT cm.*, u.user_name FROM ChatMessage cm " +
                "JOIN User u ON cm.user_id = u.user_id WHERE cm.message_id = ?";
        try (Connection connection = getConnection();
             PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, messageId);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                return mapRow(rs);
            }
        } catch (SQLException e) {
            System.err.println("Database connection or query execution failed: " + e.getMessage());
        }
        return null;
    }

    public List<ChatMessage> getHistory(int eventId) {
        String sql = "SELECT cm.*, u.user_name FROM ChatMessage cm " +
                "JOIN User u ON cm.user_id = u.user_id " +
                "WHERE cm.event_id = ? ORDER BY cm.created_at DESC LIMIT 50";
        List<ChatMessage> messages = new ArrayList<>();
        try (Connection connection = getConnection();
             PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, eventId);
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                messages.add(mapRow(rs));
            }
        } catch (SQLException e) {
            System.err.println("Database connection or query execution failed: " + e.getMessage());
        }
        java.util.Collections.reverse(messages);
        return messages;
    }

    private ChatMessage mapRow(ResultSet rs) throws SQLException {
        return new ChatMessage(
                rs.getInt("message_id"),
                rs.getInt("event_id"),
                rs.getInt("user_id"),
                rs.getString("user_name"),
                rs.getString("content"),
                rs.getTimestamp("created_at").toLocalDateTime()
        );
    }
}
