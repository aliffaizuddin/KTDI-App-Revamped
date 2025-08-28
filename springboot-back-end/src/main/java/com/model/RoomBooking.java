package com.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Table(name = "RoomBooking")
@Data
public class RoomBooking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "booking_id")
    private Long bookingId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Authentication user;

    @ManyToOne
    @JoinColumn(name = "room_id", nullable = false)
    private RoomRegistration room;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @Column(name = "approval_status")
    private String approvalStatus = "Pending";

    @Column(name = "payment_details")
    private String paymentDetails;
}