package com.example.backend.controller;

import java.util.List;

import com.example.backend.dto.PostRequest;
import com.example.backend.dto.PostResponse;
import com.example.backend.service.PostService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/post")
@CrossOrigin(origins = "http://localhost:3000")
public class PostController {

    private final PostService postService;

    public PostController(PostService postService){
        this.postService = postService;
    }

    // Creeaza un post nou
    @PostMapping("/create")
    public ResponseEntity<Void> createPost(@Valid @RequestBody PostRequest request) {
        postService.createPost(request);
        return ResponseEntity.status(201).build(); // 201 Created
    }

    // Toate posturile mele
    @GetMapping("/myposts")
    public ResponseEntity<List<PostResponse>> getAllMyPosts() {
        List<PostResponse> posts = postService.getAllMyPosts();
        System.out.println("POSTARI LUATE CU SUCCES");
        return ResponseEntity.ok(posts);
    }

    // Toate posturile unui user
    @GetMapping("/user/{username}")
    public ResponseEntity<List<PostResponse>> getAllPostsByUser(@PathVariable String username) {
        List<PostResponse> posts = postService.getAllPostsByUsername(username);
        System.out.println("HIT PostController user=" + username);
        return ResponseEntity.ok(posts);
    }

    // Toate posturile (de exemplu pentru feed global)
    @GetMapping("/all")
    public ResponseEntity<List<PostResponse>> getAllPosts() {
        List<PostResponse> posts = postService.getAllPosts();
        return ResponseEntity.ok(posts);
    }

    // Stergere post
    @DeleteMapping("/delete/{postId}")
    public ResponseEntity<Void> deletePost(@PathVariable Long postId) {
        postService.deletePost(postId);
        return ResponseEntity.noContent().build();
    }
}