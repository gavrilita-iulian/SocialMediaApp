package com.example.backend.service;

import java.util.List;

import javax.management.RuntimeErrorException;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.example.backend.model.User;
import com.example.backend.dto.PostRequest;
import com.example.backend.dto.PostResponse;
import com.example.backend.model.Post;
import com.example.backend.repository.UserRepository;
import com.example.backend.security.CustomUserDetails;
import com.example.backend.repository.PostRepository;

@Service
public class PostService {

    private final UserRepository userRepository;
    private final PostRepository postRepository;

    public PostService(PostRepository postRepository,
                    UserRepository userRepository) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }

    public void createPost(PostRequest request){

        // luam userul autenticat din SecurityContext
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

        // username-ul la tine e emailul
        String email = userDetails.getUsername();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Post post = new Post(
                request.getTitle(),
                request.getBody(),
                user
        );

        postRepository.save(post);
    }

    public void deletePost(Long postId){

        Post post = postRepository.findById(postId)
        .orElseThrow(() -> new RuntimeException("Post not found"));

        // verificam daca postarea apartine userului---trebuie facut

        ///delete comments
        postRepository.deleteById(postId);
    }

    public List<PostResponse> getAllPosts(){
        return postRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(p -> new PostResponse(
                        p.getId(),
                        p.getTitle(),
                        p.getBody(),
                        p.getUser().getUsername(),
                        p.getCreatedAt()))
                .toList();
    }

    public List<PostResponse> getAllPostsByUsername(String username){
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return postRepository.findByUserOrderByCreatedAtDesc(user)
                .stream()
                .map(p -> new PostResponse(
                        p.getId(),
                        p.getTitle(),
                        p.getBody(),
                        p.getUser().getUsername(),
                        p.getCreatedAt()))
                .toList();
    }

    public List<PostResponse> getAllMyPosts(){
        // luam userul autenticat din SecurityContext
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

        // username-ul la tine e emailul
        String email = userDetails.getUsername();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return postRepository.findByUserOrderByCreatedAtDesc(user)
                .stream()
                .map(p -> new PostResponse(
                        p.getId(),
                        p.getTitle(),
                        p.getBody(),
                        p.getUser().getUsername(),
                        p.getCreatedAt()))
                .toList();
    }
}