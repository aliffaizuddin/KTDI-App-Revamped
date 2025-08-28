package com.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "Feedback")
@Data
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "feedback_id")
    private Long feedbackId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Authentication user;

    @Column(name = "college_rating")
    private Integer collegeRating;

    @Column(name = "accommodation_rating")
    private Integer accommodationRating;

    @Column(name = "facilities_rating")
    private Integer facilitiesRating;

    private String recommendation;
}