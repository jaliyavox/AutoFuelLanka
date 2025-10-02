package com.autofuellanka.systemmanager.dto;

import com.autofuellanka.systemmanager.model.Booking;

public class BookingDTO {
    private Long id;
    private String startTime;
    private String endTime;
    private String fuelType;
    private Double litersRequested;
    private String status;       // keep as String for JSON
    private String type;         // keep as String for JSON
    private Long customerId;
    private Long locationId;
    private Long vehicleId;
    private Long serviceTypeId;

    public BookingDTO(Booking b) {
        this.id = b.getId();
        this.startTime = b.getStartTime();
        this.endTime = b.getEndTime();
        this.fuelType = b.getFuelType();
        this.litersRequested = b.getLitersRequested();
        this.status = (b.getStatus() != null) ? b.getStatus().name() : null;  // enum → String
        this.type = (b.getType() != null) ? b.getType().name() : null;        // enum → String
        this.customerId = b.getCustomerId();
        this.locationId = b.getLocationId();
        this.vehicleId = b.getVehicleId();
        this.serviceTypeId = b.getServiceTypeId();
    }

    // --- Getters ---
    public Long getId() { return id; }
    public String getStartTime() { return startTime; }
    public String getEndTime() { return endTime; }
    public String getFuelType() { return fuelType; }
    public Double getLitersRequested() { return litersRequested; }
    public String getStatus() { return status; }
    public String getType() { return type; }
    public Long getCustomerId() { return customerId; }
    public Long getLocationId() { return locationId; }
    public Long getVehicleId() { return vehicleId; }
    public Long getServiceTypeId() { return serviceTypeId; }
}
