
package com.autofuellanka.systemmanager.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.*;

@Entity
@Table(name="bookings", indexes = {
        @Index(columnList = "startTime, location_id", unique = false)
})
public class Booking {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false) private User customer;
    @ManyToOne(optional = false) private Location location;

    @Enumerated(EnumType.STRING)
    private BookingType type;

    // SERVICE fields
    @ManyToOne private ServiceType serviceType;
    @ManyToOne private Vehicle vehicle;

    // FUEL fields
    @Enumerated(EnumType.STRING)
    private FuelType fuelType;
    private Double litersRequested;

    private LocalDateTime startTime;
    private LocalDateTime endTime;

    @Enumerated(EnumType.STRING)
    private BookingStatus status = BookingStatus.PENDING;

    // getters/setters
}
