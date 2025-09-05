package com.NeuroCare.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "neroCare")
public class User {

    @Id
    private String id;

    private String name;
    private String email;
    private String password;
   // private String role;

    private Membership membership;
    private List<ChatMessage> chatHistory;
    private List<MoodLog> moodLogs;
    private Settings settings;
    private LocalDateTime createdAt = LocalDateTime.now();

    // Getters and Setters
}

