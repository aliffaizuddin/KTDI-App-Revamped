package com.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "Authentication")
@Data
public class Authentication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "otp_verified")
    private Boolean otpVerified = false;

    private String role = "user";
}