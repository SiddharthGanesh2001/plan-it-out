package com.example.plainitoutserverside.service;

import com.example.plainitoutserverside.model.Event;
import com.example.plainitoutserverside.model.User;
import com.example.plainitoutserverside.repository.EventRepo;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.ArrayList;

@Service
public class EventService {
    private EventRepo eventRepo = new EventRepo();

    public ArrayList<Event> getEvents(int userId, Integer filterId, String filter, String searchKey, int mode)  throws SQLException {
        ArrayList<Event> events = eventRepo.getEventsRepo(userId, searchKey, mode);
        if(filterId !=null && filterId ==1){
            events = filterEventsOnCategory(events, filter);
        }
        return events;
    }

    private ArrayList<Event> filterEventsOnCategory(ArrayList<Event> events, String filter){
        ArrayList<Event> filteredEvents = new ArrayList<>();
        for(Event event : events){
            if(filter.equals(event.getCategory())){
                filteredEvents.add(event);
            }
        }
        return filteredEvents;
    }

    public Event getEvent(int eventId) throws SQLException {
        Event event = eventRepo.getEventRepo(eventId);
        return event;
    }

    public Event createEvent(int hostId, String eventName, String eventDescription, String category, LocalDateTime dateTime, int totalCount, String location) throws SQLException {
        Event event = eventRepo.createEventRepo(hostId, eventName, eventDescription, category, dateTime, totalCount, location);
        return event;
    }

    public Event updateEvent(int eventId, String eventDescription, int totalCount, String location) throws SQLException {
        return eventRepo.updateEventRepo(eventId, eventDescription, location, totalCount);
    }

    public void joinEvent(int eventId, int userId){
        eventRepo.joinEventRepo(eventId, userId);
    }

    public void unenrollEvent(int eventId, int userId){
        int hostId = eventRepo.getHostIdFromEventId(eventId);
        if(hostId != userId){
            eventRepo.unenrollEventRepo(eventId, userId);
        }
    }

    public boolean deleteEvent(int eventId, int userId) throws SQLException {
        int hostId = eventRepo.getHostIdFromEventId(eventId);
        if (hostId == userId) {
            eventRepo.deleteEventRepo(eventId);
            return true;
        }
        return false;
    }

    public void addFriend(int userId, int friendId){
        eventRepo.addFriendRepo(userId, friendId);
    }

    public void unfollowUser(int userId, int friendId){
        eventRepo.unfollowUser(userId, friendId);
    }

    public ArrayList<User> getFollowingUsers(int userId) throws SQLException {
        ArrayList<User> followingUsers = new ArrayList<>();
        ArrayList<Integer> followingUserIds = eventRepo.getFollowingUserIdsRepo(userId);
        for (Integer followingUserId : followingUserIds) {
            if(followingUserId != null){
                followingUsers.add(eventRepo.getUserFromId(followingUserId));
            }
        }
        return followingUsers;
    }

    public ArrayList<User> getFollowers(int userId) throws SQLException {
        ArrayList<User> followersUsers = new ArrayList<>();
        ArrayList<Integer> followingUserIds = eventRepo.getFollowerUserIdsRepo(userId);
        for (Integer followingUserId : followingUserIds) {
            if(followingUserId != null){
                followersUsers.add(eventRepo.getUserFromId(followingUserId));
            }
        }
        return followersUsers;
    }

    public ArrayList<User> getGuestList(int userId) throws SQLException {
        ArrayList<User> guestUsers = new ArrayList<>();
        ArrayList<Integer> guestUserIds = eventRepo.getGuestUserIdsRepo(userId);
        for (Integer guestUserId : guestUserIds) {
            if(guestUserId != null){
                guestUsers.add(eventRepo.getUserFromId(guestUserId));
            }
        }
        return guestUsers;
    }

}