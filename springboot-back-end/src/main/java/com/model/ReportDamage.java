package com.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "ReportDamage")
@Data
public class ReportDamage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "report_id")
    private Long reportId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Authentication user;

    @Column(name = "image_path")
    private String imagePath;

    @Column(name = "type_of_damage")
    private String typeOfDamage;

    private String description;

    private String status = "Draft";
}