package com.example.backend.dto;

import java.time.LocalDateTime;

public class PostResponse {
    private Long id;
    private String title;
    private String body;
    private String user_id;
    private LocalDateTime createdAt;

    public PostResponse(Long id, String title, String body, String username, LocalDateTime createdAt) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.user_id = username;
        this.createdAt = createdAt;
    }

    public Long getId() { return id; }
    public String getTitle() { return title; }
    public String getBody() { return body; }
    public String getUser_id() { return user_id; }
    public LocalDateTime getCreatedAt() { return createdAt; }
}