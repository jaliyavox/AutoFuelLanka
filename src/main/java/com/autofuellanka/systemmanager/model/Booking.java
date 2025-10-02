package com.autofuellanka.systemmanager.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "bookings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "start_time")
    private String startTime;

    @Column(name = "end_time")
    private String endTime;

    @Column(name = "fuel_type")
    private String fuelType;

    @Column(name = "liters_requested")
    private Double litersRequested;

    @Column(nullable = false)
    private String status;

    @Column(nullable = false)
    private String type; // FUEL or SERVICE

    @Column(name = "customer_id", nullable = false)
    private Long customerId;

    @Column(name = "location_id")
    private Long locationId;

    @Column(name = "vehicle_id")
    private Long vehicleId;

    @Column(name = "service_type_id")
    private Long serviceTypeId;
}
