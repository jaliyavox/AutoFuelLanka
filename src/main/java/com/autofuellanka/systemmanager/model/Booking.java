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

    @ManyToOne(optional = false)
    private User customer;

    @ManyToOne(optional = false)
    private Location location;

    @Enumerated(EnumType.STRING)
    private BookingType type;

    // SERVICE fields
    @ManyToOne
    private ServiceType serviceType;

    @ManyToOne
    private Vehicle vehicle;

    // FUEL fields
    @Enumerated(EnumType.STRING)
    private FuelType fuelType;
    private Double litersRequested;

    private LocalDateTime startTime;
    private LocalDateTime endTime;

    @Enumerated(EnumType.STRING)
    private BookingStatus status = BookingStatus.PENDING;

    // Constructors
    public Booking() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getCustomer() { return customer; }
    public void setCustomer(User customer) { this.customer = customer; }

    public Location getLocation() { return location; }
    public void setLocation(Location location) { this.location = location; }

    public BookingType getType() { return type; }
    public void setType(BookingType type) { this.type = type; }

    public ServiceType getServiceType() { return serviceType; }
    public void setServiceType(ServiceType serviceType) { this.serviceType = serviceType; }

    public Vehicle getVehicle() { return vehicle; }
    public void setVehicle(Vehicle vehicle) { this.vehicle = vehicle; }

    public FuelType getFuelType() { return fuelType; }
    public void setFuelType(FuelType fuelType) { this.fuelType = fuelType; }

    public Double getLitersRequested() { return litersRequested; }
    public void setLitersRequested(Double litersRequested) { this.litersRequested = litersRequested; }

    public LocalDateTime getStartTime() { return startTime; }
    public void setStartTime(LocalDateTime startTime) { this.startTime = startTime; }

    public LocalDateTime getEndTime() { return endTime; }
    public void setEndTime(LocalDateTime endTime) { this.endTime = endTime; }

    public BookingStatus getStatus() { return status; }
    public void setStatus(BookingStatus status) { this.status = status; }
}
