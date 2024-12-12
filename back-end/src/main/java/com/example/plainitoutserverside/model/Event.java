package com.example.plainitoutserverside.model;

import java.time.LocalDateTime;

public class Event {
    private int eventId;
    private String eventName;
    private String eventDescription;
    private String category;
    private LocalDateTime dateTime;
    private int hostId;
    private String hostName;
    private  int joinedCount;
    private int totalCount;
    private String location;


    private Event(Builder builder) {
        this.eventId = builder.eventId;
        this.eventName = builder.eventName;
        this.eventDescription = builder.eventDescription;
        this.category = builder.category;
        this.dateTime = builder.dateTime;
        this.hostId = builder.hostId;
        this.hostName = builder.hostName;
        this.joinedCount = builder.joinedCount;
        this.totalCount = builder.totalCount;
        this.location = builder.location;
    }

    public int getEventId() {
        return eventId;
    }

    public String getEventName() {
        return eventName;
    }

    public String getEventDescription() {
        return eventDescription;
    }

    public String getCategory() {
        return category;
    }

    public LocalDateTime getDateTime() {
        return dateTime;
    }

    public int getHostId() {
        return hostId;
    }

    public String getHostName() {return hostName;}

    public int getJoinedCount() {
        return joinedCount;
    }

    public int getTotalCount() {
        return totalCount;
    }

    public String getLocation() {
        return location;
    }

    public static class Builder {
        private int eventId;
        private String eventName;
        private String eventDescription;
        private String category;
        private LocalDateTime dateTime;
        private int hostId;
        private String hostName;
        private int joinedCount;
        private int totalCount;
        private String location;

        public Builder setEventId(int eventId) {
            this.eventId = eventId;
            return this;
        }

        public Builder setEventName(String eventName) {
            this.eventName = eventName;
            return this;
        }

        public Builder setEventDescription(String eventDescription) {
            this.eventDescription = eventDescription;
            return this;
        }

        public Builder setCategory(String category) {
            this.category = category;
            return this;
        }

        public Builder setDateTime(LocalDateTime dateTime) {
            this.dateTime = dateTime;
            return this;
        }

        public Builder setHostId(int hostId) {
            this.hostId = hostId;
            return this;
        }

        public Builder setHostName(String hostName) {
            this.hostName = hostName;
            return this;
        }

        public Builder setJoinedCount(int joinedCount) {
            this.joinedCount = joinedCount;
            return this;
        }

        public Builder setTotalCount(int totalCount) {
            this.totalCount = totalCount;
            return this;
        }

        public Builder setLocation(String location) {
            this.location = location;
            return this;
        }

        public Event build() {
            return new Event(this);
        }
    }
}
