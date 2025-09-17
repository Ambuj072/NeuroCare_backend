package com.NeuroCare.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.Map;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    @Value("${openai.api.key}")
    private String openaiApiKey;

    private final WebClient webClient = WebClient.builder()
            .baseUrl("https://api.openai.com/v1/chat/completions")
            .build();

    @PostMapping
    public Mono<String> chat(@RequestBody Map<String, String> payload) {
        String userMessage = payload.get("message");

        return webClient.post()
                .header("Authorization", "Bearer " + openaiApiKey)
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(Map.of(
                        "model", "gpt-3.5-turbo",
                        "messages", new Object[]{
                                Map.of("role", "system", "content",
                                        "You are NeroCare, a caring and supportive mental health assistant. "
                                                + "Only introduce yourself if the user explicitly asks 'who are you' or something similar. "
                                                + "Otherwise, never repeat your name or introduction. "
                                                + "In all following replies — just respond with empathy, guidance, "
                                                + "and helpful mental health tips."),
                                Map.of("role", "user", "content", userMessage)
                        }
                ))
                .retrieve()
                .bodyToMono(Map.class)
                .map(response -> {
                    try {
                        var choices = (java.util.List<Map<String, Object>>) response.get("choices");
                        if (choices != null && !choices.isEmpty()) {
                            Map<String, Object> message = (Map<String, Object>) choices.get(0).get("message");
                            return (String) message.get("content");
                        }
                        return "Sorry, I couldn’t generate a response.";
                    } catch (Exception e) {
                        return "Error processing response.";
                    }
                });
    }
}

