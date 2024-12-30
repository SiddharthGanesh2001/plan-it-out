package com.example.plainitoutserverside.repository;

import com.example.plainitoutserverside.model.Event;
import com.example.plainitoutserverside.model.User;

import java.sql.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class EventRepo {

    static private final String URL = "jdbc:mysql://localhost:3306/planItOutDB";
    static private final String USERNAME = "root";
    static private final String PASSWORD = "Hello@123";

    private Connection getConnection() throws SQLException {
        return DriverManager.getConnection(URL, USERNAME, PASSWORD);
    }

    public ArrayList<Event> getEventsRepo(int userId, String searchKey, int mode) {
        ArrayList<Event> eventsList = new ArrayList<>();
        try (Connection connection = getConnection();
             Statement statement = connection.createStatement();
             ResultSet resultSet = statement.executeQuery("SELECT * FROM EventList")) {
            while (resultSet.next()) {
                int eventId = resultSet.getInt("event_id");
                int hostId = resultSet.getInt("host_id");
                boolean isHost = userId == hostId;
                boolean userJoined = checkIfUserJoinedEvent(userId, eventId);
                if (mode == 1) {
                    if (!isHost && !userJoined) {
                        eventsList.add(getEventValuesFromResultSet(resultSet));
                    }
                } else if (mode == 2) {
                    if (isHost || userJoined) {
                        eventsList.add(getEventValuesFromResultSet(resultSet));
                    }
                } else if (mode == 3) {
                    String eventName = resultSet.getString("event_name");
                    boolean matchesSearchKey = eventName.toLowerCase().contains(searchKey.toLowerCase());
                    if (matchesSearchKey && !isHost) {
                        eventsList.add(getEventValuesFromResultSet(resultSet));
                    }
                } else {
                    System.err.println("Invalid mode: " + mode);
                }
            }
        } catch (SQLException e) {
            System.err.println("Database connection or query execution failed: " + e.getMessage());
        }
        return eventsList;
    }


    private boolean checkIfUserJoinedEvent(int userId, int eventId) {
        String sql = "SELECT * FROM GuestList WHERE user_id = " + userId;
        try (Connection connection = getConnection();
             Statement statement = connection.createStatement();
             ResultSet resultSet = statement.executeQuery(sql))
            {
                while (resultSet.next()) {
                    if (resultSet.getInt("event_id") == eventId){
                        return true;
                    }
                }
                return false;
            } catch (SQLException e) {
            System.err.println("Database connection or query execution failed: " + e.getMessage());
        }
        return false;
    }

    public Event getEventRepo(int eventId) {
        try (Connection connection = getConnection();
            Statement statement = connection.createStatement();
            ResultSet resultSet = statement.executeQuery("SELECT * FROM EventList WHERE event_id = " + eventId)) {
            if (resultSet.next()) {
                Event event = getEventValuesFromResultSet(resultSet);
                return event;
            }
            return null;
        } catch (SQLException e) {
            System.err.println("Database connection or query execution failed: " + e.getMessage());
            return null;
        }
    }

    public Event createEventRepo(int hostId, String eventName, String eventDescription, String category, LocalDateTime dateTime, int totalCount, String location) {
        try (Connection connection = getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement("INSERT INTO EventList (host_id, event_name, event_description, event_category, date_time, total_count, location) VALUES (" +
                    "?,?,?,?,?,?,?)",  PreparedStatement.RETURN_GENERATED_KEYS)) {
            preparedStatement.setInt(1, hostId);
            preparedStatement.setString(2, eventName);
            preparedStatement.setString(3, eventDescription);
            preparedStatement.setString(4, category);
            preparedStatement.setTimestamp(5, Timestamp.valueOf(dateTime));
            preparedStatement.setInt(6, totalCount);
            preparedStatement.setString(7, location);
            preparedStatement.executeUpdate();
            try (ResultSet generatedKeys = preparedStatement.getGeneratedKeys()) {
                if (generatedKeys.next()) {
                    return getEventRepo(generatedKeys.getInt(1));
                } else {
                    throw new SQLException("Creating event failed, no ID obtained.");
                }
            }
        } catch (SQLException e) {
            System.err.println("Database connection or query execution failed: " + e.getMessage());
            return null;
        }
    }

    public Event updateEventRepo(int eventId, String eventDescription, String eventLocation, Integer eventTotalCount) throws SQLException {
        StringBuilder sql = new StringBuilder("UPDATE EventList SET ");
        List<Object> params = new ArrayList<>();
        if (eventDescription != null) {
            sql.append("event_description = ?, ");
            params.add(eventDescription);
        }
        if (eventLocation != null) {
            sql.append("location = ?, ");
            params.add(eventLocation);
        }
        if (eventTotalCount != null) {
            sql.append("total_count = ?, ");
            params.add(eventTotalCount);
        }
        sql.setLength(sql.length() - 2);
        sql.append(" WHERE event_id = ?");
        params.add(eventId);
        try (Connection connection = getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(sql.toString())) {
            for (int i = 0; i < params.size(); i++) {
                preparedStatement.setObject(i + 1, params.get(i));
            }
            preparedStatement.executeUpdate();
        }
        return getEventRepo(eventId);
    }

    private int getEventParticipantsCount(int eventId){
        String sql = "SELECT COUNT(*) FROM GuestList WHERE event_id = " + eventId;
        try (Connection connection = getConnection();
             Statement statement = connection.createStatement();
             ResultSet resultSet = statement.executeQuery(sql))
        {
            if (resultSet.next()) {
                return resultSet.getInt("COUNT(*)");
            }
        } catch (SQLException e) {
            System.err.println("Database connection or query execution failed: " + e.getMessage());
        }
        return 0;
    }

    private String getUserNameFromId(int userId){
        String sql = "SELECT user_name FROM User where user_id = " + userId;
        try (Connection connection = getConnection();
             Statement statement = connection.createStatement();
             ResultSet resultSet = statement.executeQuery(sql))
        {
            if (resultSet.next()) {
                return resultSet.getString("user_name");
            }
        } catch (SQLException e) {
            System.err.println("Database connection or query execution failed: " + e.getMessage());
        }
        return "";
    }

    private Event getEventValuesFromResultSet(ResultSet resultSet) throws SQLException {
        return new Event.Builder()
                .setEventId(resultSet.getInt("event_id"))
                .setEventName(resultSet.getString("event_name"))
                .setEventDescription(resultSet.getString("event_description"))
                .setCategory(resultSet.getString("event_category"))
                .setDateTime(resultSet.getTimestamp("date_time").toLocalDateTime())
                .setHostId(resultSet.getInt("host_id"))
                .setHostName(getUserNameFromId(resultSet.getInt("host_id")))
                .setJoinedCount(getEventParticipantsCount(resultSet.getInt("event_id")))
                .setTotalCount(resultSet.getInt("total_count"))
                .setLocation(resultSet.getString("location"))
                .build();
    }

    public int getHostIdFromEventId(int eventId) {
        int hostId = 0;
        try (Connection connection = getConnection();
             Statement statement = connection.createStatement();
             ResultSet resultSet = statement.executeQuery("SELECT host_id FROM EventList where event_id = " + eventId)) {
            if (resultSet.next()) {
                hostId = resultSet.getInt("host_id");
            }
        } catch (SQLException e) {
            System.err.println("Database connection or query execution failed: " + e.getMessage());
        }
        return hostId;
    }

    public void joinEventRepo(int eventId, int userId){
        try (Connection connection = getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement("INSERT INTO GuestList (event_id, user_id) VALUES (" + "?,?)")) {
            preparedStatement.setInt(1, eventId);
            preparedStatement.setInt(2, userId);
            preparedStatement.executeUpdate();
        } catch (SQLException e) {
            System.err.println("Database connection or query execution failed: " + e.getMessage());
        }
    }

    public void unenrollEventRepo(int eventId, int userId){
        try (Connection connection = getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement("DELETE FROM guestlist WHERE event_id = ? AND user_id = ?")) {
            preparedStatement.setInt(1, eventId);
            preparedStatement.setInt(2, userId);
            preparedStatement.executeUpdate();
        } catch (SQLException e) {
            System.err.println("Database connection or query execution failed: " + e.getMessage());
        }
    }

    public void deleteEventRepo(int eventId) {
        try (Connection connection = getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement("DELETE FROM EventList WHERE event_id = ?")) {
            preparedStatement.setInt(1, eventId);
            preparedStatement.executeUpdate();
        } catch (SQLException e) {
            System.err.println("Database connection or query execution failed: " + e.getMessage());
        }
    }

    public void addFriendRepo(int userId, int friendId){
        try (Connection connection = getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement("INSERT INTO FriendList (user_id, friend_id) VALUES (" + "?,?)")) {
            preparedStatement.setInt(1, userId);
            preparedStatement.setInt(2, friendId);
            preparedStatement.executeUpdate();
        } catch (SQLException e) {
            System.err.println("Database connection or query execution failed: " + e.getMessage());
        }
    }

    public void unfollowUser(int userId, int friendId){
        try (Connection connection = getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement("DELETE FROM FriendList WHERE user_id = ? AND friend_id = ? ")) {
            preparedStatement.setInt(1, userId);
            preparedStatement.setInt(2, friendId);
            preparedStatement.executeUpdate();
        } catch (SQLException e) {
            System.err.println("Database connection or query execution failed: " + e.getMessage());
        }
    }

    public User getUserFromId(int userId){
        String sql = "SELECT * FROM User WHERE user_id = " + userId;
        try (Connection connection = getConnection();
             Statement statement = connection.createStatement();
             ResultSet resultSet = statement.executeQuery(sql))
        {
            if (resultSet.next()) {
                String userEmail = resultSet.getString("user_email");
                String userName = resultSet.getString("user_name");
                return new User(userId, userEmail, userName);
            }
        } catch (SQLException e) {
            System.err.println("Database connection or query execution failed: " + e.getMessage());
        }
        return null;
    }

    public  ArrayList<Integer> getFollowingUserIdsRepo(int userId){
        String sql = "SELECT friend_id FROM FriendList WHERE user_id = " + userId;
        ArrayList<Integer> followingUserIds = new ArrayList<>();
        try (Connection connection = getConnection();
             Statement statement = connection.createStatement();
             ResultSet resultSet = statement.executeQuery(sql))
        {
            while (resultSet.next()) {
                int friendId = resultSet.getInt("friend_id");
                followingUserIds.add(friendId);
            }
        } catch (SQLException e) {
            System.err.println("Database connection or query execution failed: " + e.getMessage());
        }
        return followingUserIds;
    }

    public  ArrayList<Integer> getFollowerUserIdsRepo(int userId){
        String sql = "SELECT user_id FROM FriendList WHERE friend_id = " + userId;
        ArrayList<Integer> followerUserIds = new ArrayList<>();
        try (Connection connection = getConnection();
             Statement statement = connection.createStatement();
             ResultSet resultSet = statement.executeQuery(sql))
        {
            while (resultSet.next()) {
                int friendId = resultSet.getInt("user_id");
                followerUserIds.add(friendId);
            }
        } catch (SQLException e) {
            System.err.println("Database connection or query execution failed: " + e.getMessage());
        }
        return followerUserIds;
    }

    public  ArrayList<Integer> getGuestUserIdsRepo(int eventId){
        String sql = "SELECT user_id FROM GuestList WHERE event_id = " + eventId;
        ArrayList<Integer> guestUserIds = new ArrayList<>();
        try (Connection connection = getConnection();
             Statement statement = connection.createStatement();
             ResultSet resultSet = statement.executeQuery(sql))
        {
            while (resultSet.next()) {
                int friendId = resultSet.getInt("user_id");
                guestUserIds.add(friendId);
            }
        } catch (SQLException e) {
            System.err.println("Database connection or query execution failed: " + e.getMessage());
        }
        return guestUserIds;
    }

}
