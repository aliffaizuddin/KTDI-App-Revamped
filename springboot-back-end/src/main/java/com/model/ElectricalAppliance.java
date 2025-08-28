package com.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "ElectricalAppliance")
@Data
public class ElectricalAppliance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "appliance_id")
    private Long applianceId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Authentication user;

    @Column(name = "appliance_list")
    private String applianceList;

    @Column(name = "total_amount")
    private Double totalAmount;

    @Column(name = "payment_details")
    private String paymentDetails;
}