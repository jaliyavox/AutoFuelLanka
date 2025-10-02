package com.autofuellanka.systemmanager.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "bookings")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor @Builder
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "start_time")
    private String startTime;

    @Column(name = "end_time")
    private String endTime;

    // ---- fuel fields (ignored for SERVICE) ----
    @Column(name = "fuel_type")
    private String fuelType;

    @Column(name = "liters_requested")
    private Double litersRequested;

    // ---- status/type now enums but still stored as VARCHAR ----
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BookingStatus status;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BookingType type; // FUEL or SERVICE

    // ---- references by id (kept as-is for now) ----
    @Column(name = "customer_id", nullable = false)
    private Long customerId;

    @Column(name = "location_id")
    private Long locationId;

    @Column(name = "vehicle_id")
    private Long vehicleId;

    // required when type=SERVICE
    @Column(name = "service_type_id")
    private Long serviceTypeId;

    // Defaults & normalization
    @PrePersist
    public void prePersist() {
        if (status == null) status = BookingStatus.PENDING;
    }
}
