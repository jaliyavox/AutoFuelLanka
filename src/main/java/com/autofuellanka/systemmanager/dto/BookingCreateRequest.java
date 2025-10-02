package com.autofuellanka.systemmanager.dto;

import jakarta.validation.constraints.NotNull;

public class BookingCreateRequest {
    // ISO strings are fine for the uni project (store as String in entity if you want)
    public String startTime;     // e.g., "2025-10-05T10:30"
    public String endTime;       // optional

    public String type;          // e.g., "FUEL" or "SERVICE"
    public String fuelType;      // e.g., "PETROL" | "DIESEL"
    public Double litersRequested;

    @NotNull public Long locationId;
    public Long vehicleId;

    // service info (optional)
    public Long serviceTypeId;
}
