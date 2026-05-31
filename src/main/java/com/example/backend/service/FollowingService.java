package com.example.backend.service;

import com.example.backend.model.Following;
import com.example.backend.model.User;
import com.example.backend.repository.FollowingRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.security.CustomUserDetails;



import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
public class FollowingService {

    private final FollowingRepository followingRepository;
    private final UserRepository userRepository;

    public FollowingService(FollowingRepository followingRepository,
                            UserRepository userRepository) {
        this.followingRepository = followingRepository;
        this.userRepository = userRepository;
    }

    
    // =======================
    // FOLLOW
    // =======================
    @Transactional
    public void follow(Long followedId) {
         // luam userul autenticat din SecurityContext
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

        // username-ul la tine e emailul
        String email = userDetails.getUsername();

        User follower = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (follower.getId().equals(followedId)) {
            throw new IllegalArgumentException("You can't follow yourself");
        }


        User followed = userRepository.findById(followedId)
                .orElseThrow(() -> new IllegalArgumentException("User urmărit inexistent"));

        boolean alreadyFollowing =
                followingRepository.existsByFollowerAndFollowed(follower, followed);

        if (alreadyFollowing) {
            return; 

        }

        Following following = new Following(follower, followed);
        followingRepository.save(following);
    }

    // =======================
    // UNFOLLOW
    // =======================
    @Transactional
    public void unfollow( Long followedId) {

         // luam userul autenticat din SecurityContext
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

        // username-ul la tine e emailul
        String email = userDetails.getUsername();

        User follower = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        User followed = userRepository.findById(followedId)
                .orElseThrow(() -> new IllegalArgumentException("User urmărit inexistent"));

        followingRepository.findByFollowerAndFollowed(follower, followed)
                .ifPresent(followingRepository::delete);
    }

    // =======================
    // CHECK FOLLOWING
    // =======================
    // @Transactional(readOnly = true)
    // public boolean isFollowing(Long followerId, Long followedId) {

    //     User follower = userRepository.findById(followerId)
    //             .orElseThrow(() -> new IllegalArgumentException("Follower inexistent"));

    //     User followed = userRepository.findById(followedId)
    //             .orElseThrow(() -> new IllegalArgumentException("User urmărit inexistent"));

    //     return followingRepository.existsByFollowerAndFollowed(follower, followed);
    // }                                   trebuie adaugat jwt sa apara altfel daca ai deja follow ca si la log in log out

    // =======================
    // LIST FOLLOWING
    // =======================
//     @Transactional(readOnly = true)
//     public List<User> getFollowing() {
//         // luam userul autenticat din SecurityContext
//         Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//         CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

//         // username-ul la tine e emailul
//         String email = userDetails.getUsername();

//         User following = userRepository.findByEmail(email)
//                 .orElseThrow(() -> new IllegalArgumentException("User inexistent"));

//         return followingRepository.findByFollowerOrderByCreatedAtDesc(following)
//                 .stream()
//                 .map(Following::getFollowed)
//                 .toList();
//     }        trebuie 2 separeate una pentru  ine una pentru altii

//     // =======================
//     // LIST FOLLOWERS
//     // =======================
//     @Transactional(readOnly = true)
//     public List<User> getFollowers() {
//          // luam userul autenticat din SecurityContext
//         Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//         CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

//         // username-ul la tine e emailul
//         String email = userDetails.getUsername();


//         User followed = userRepository.findByEmail(email)
//                 .orElseThrow(() -> new IllegalArgumentException("User inexistent"));

//         return followingRepository.findByFollowedOrderByCreatedAtDesc(followed)
//                 .stream()
//                 .map(Following::getFollower)
//                 .toList();
//     } trebuie 2 separeate una pentru  ine una pentru altii

//     // =======================
//     // COUNTS
//     // =======================
//     @Transactional(readOnly = true)
//     public long countFollowers(Long userId) {

//         User user = userRepository.findById(userId)
//                 .orElseThrow(() -> new IllegalArgumentException("User inexistent"));

//         return followingRepository.countByFollowed(user);
//     } trebuie 2 separeate una pentru  ine una pentru altii

//     @Transactional(readOnly = true)
//     public long countFollowing(Long userId) {

//         User user = userRepository.findById(userId)
//                 .orElseThrow(() -> new IllegalArgumentException("User inexistent"));

//         return followingRepository.countByFollower(user);
//     }trebuie adaugat jwt
 }     