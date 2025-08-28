package com.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "RoomRegistration")
@Data
public class RoomRegistration {

    @Id
    @GeneratedValue
    @Column(name = "room_id")
    private Long roomId;

    @Column(name = "room_type")
    private String roomType;
    private String block;
    private String level;
    private String number;
    private String status = "available";
}