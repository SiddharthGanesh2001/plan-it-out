package com.example.plainitoutserverside.controller;

import com.example.plainitoutserverside.dto.ChatMessageDto;
import com.example.plainitoutserverside.model.ChatMessage;
import com.example.plainitoutserverside.repository.ChatRepo;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ChatController {

    private final ChatRepo chatRepo;
    private final SimpMessagingTemplate messagingTemplate;

    public ChatController(ChatRepo chatRepo, SimpMessagingTemplate messagingTemplate) {
        this.chatRepo = chatRepo;
        this.messagingTemplate = messagingTemplate;
    }

    @MessageMapping("/chat/{eventId}")
    public void sendMessage(@DestinationVariable int eventId, @Payload ChatMessageDto incoming) {
        ChatMessage saved = chatRepo.save(eventId, incoming.getUserId(), incoming.getContent());
        if (saved == null) {
            return;
        }

        ChatMessageDto broadcast = new ChatMessageDto();
        broadcast.setEventId(saved.getEventId());
        broadcast.setUserId(saved.getUserId());
        broadcast.setUserName(saved.getUserName());
        broadcast.setContent(saved.getContent());
        broadcast.setTimestamp(saved.getCreatedAt());

        messagingTemplate.convertAndSend("/topic/event/" + eventId, broadcast);
    }

    @GetMapping("/api/chat/{eventId}")
    public ResponseEntity<List<ChatMessage>> getHistory(@PathVariable int eventId) {
        return ResponseEntity.ok(chatRepo.getHistory(eventId));
    }
}
