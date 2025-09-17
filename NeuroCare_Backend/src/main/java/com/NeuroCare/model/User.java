package com.NeuroCare.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Document(collection = "user")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    private String id;
    private String name;
    @Indexed(unique = true)
    private String email;

    @NonNull
    private String password;

    private Membership membership;
    private List<ChatMessage> chatHistory;
    private List<MoodLog> moodLogs;
    private Settings settings;

    private Map<String, String> onboardingAnswers;

    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
}
