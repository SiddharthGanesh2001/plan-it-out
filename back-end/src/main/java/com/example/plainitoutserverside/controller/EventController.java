package com.example.plainitoutserverside.controller;

import com.example.plainitoutserverside.model.Event;
import com.example.plainitoutserverside.model.User;
import com.example.plainitoutserverside.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@CrossOrigin("http://localhost:3000/")
@RestController 
public class EventController {

    private EventService eventService;

    @Autowired
    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping("/getEvents")
    public ResponseEntity<List<Event>> getEvents(@RequestParam Integer userId,
                                                 @RequestParam(required = false) Integer filterId,
                                                 @RequestParam(required = false) String filter,
                                                 @RequestParam(required = false) String searchKey,
                                                 @RequestParam int mode) throws SQLException {
        List<Event> events = eventService.getEvents(userId, filterId, filter, searchKey, mode);
        if(events!=null) {
            return ResponseEntity.of(Optional.of(events));
        }
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/getEvent")
    public ResponseEntity<Event> getEvent(@RequestParam Integer eventId) throws SQLException {
        Event event = eventService.getEvent(eventId);
        if (event != null) {
            return ResponseEntity.of(Optional.of(event));
        }
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/createEvent")
    public ResponseEntity<Event> createEvent(@RequestParam Integer hostId,
                                             @RequestParam String eventName,
                                             @RequestParam String eventDescription,
                                             @RequestParam String eventCategory,
                                             @RequestParam LocalDateTime dateTime,
                                             @RequestParam Integer totalCount,
                                             @RequestParam String location) throws SQLException {
        Event event = eventService.createEvent(hostId, eventName, eventDescription, eventCategory, dateTime, totalCount, location);
        if (event != null) {
            return ResponseEntity.of(Optional.of(event));
        }
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/updateEvent")
    public ResponseEntity<Event> updateEvent(@RequestParam int eventId,
                                             @RequestParam(required = false) String eventDescription,
                                             @RequestParam(required = false) Integer totalCount,
                                             @RequestParam(required = false) String location) throws SQLException {
        Event event = eventService.updateEvent(eventId, eventDescription, totalCount, location);
        if (event != null) {
            return ResponseEntity.of(Optional.of(event));
        }
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/joinEvent")
    public ResponseEntity<Event> joinEvent(@RequestParam Integer eventId,
                                           @RequestParam int userId) throws SQLException {
        eventService.joinEvent(eventId, userId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/unenrollEvent")
    public ResponseEntity<Event> unenrollEvent(@RequestParam Integer eventId,
                                               @RequestParam int userId) throws SQLException {
        eventService.unenrollEvent(eventId, userId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/deleteEvent")
    public ResponseEntity<Void> deleteEvent(@RequestParam Integer eventId,
                                            @RequestParam Integer userId) throws SQLException {
        boolean isDeleted = eventService.deleteEvent(eventId, userId);
        if (isDeleted) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(403).build(); // Forbidden if the user is not authorized to delete
        }
    }

    @PostMapping("/addFriend")
    public ResponseEntity<Event> addFriend(@RequestParam Integer userId,
                                           @RequestParam int friendId) throws SQLException {
        eventService.addFriend(userId,friendId); //Can create duplicate values in db
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/unfollow")
    public ResponseEntity<Event> unfollowUser(@RequestParam Integer userId,
                                           @RequestParam int friendId) throws SQLException {
        eventService.unfollowUser(userId,friendId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/following")
    public ResponseEntity<List<User>> getFollowing(@RequestParam Integer userId) throws SQLException {
        List<User> followingUsers = eventService.getFollowingUsers(userId);
        if (followingUsers == null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(followingUsers);
    }

    @GetMapping("/followers")
    public ResponseEntity<List<User>> getFollowers(@RequestParam Integer userId) throws SQLException {
        List<User> followingUsers = eventService.getFollowers(userId);
        if (followingUsers == null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(followingUsers);
    }

    @GetMapping("/guestList")
    public ResponseEntity<List<User>> getGuestList(@RequestParam Integer eventId) throws SQLException {
        List<User> followingUsers = eventService.getGuestList(eventId);
        if (followingUsers == null || followingUsers.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(followingUsers);
    }

}