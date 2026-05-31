package com.example.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;

@Entity
@Table(name="profiles")

public class Profile{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column (length = 100)
    private String description;

    @Column (nullable = false)
    private boolean verified = false;

    @OneToOne
    @JoinColumn (name = "user_id", nullable = false, unique = true)
    private User user;

    public Profile() {
    }
    
    public Profile(User user, String description) {
        this.user = user;
        this.description = description;
    }

    public Long getId(){
        return id;
    }

    public void setId(Long id){
        this.id = id;
    }

    public String getDescription(){
        return description;
    }

    public void setDescription(String description){
        this.description = description;    
    }

    public boolean getVerified(){
        return verified;
    }

    public void setVerified(boolean verified){
        this.verified = verified;
    }

    public User getUser(){
        return user;
    }

    public void setUser(User user){
        this.user = user;
    }
}
