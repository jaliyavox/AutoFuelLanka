package com.autofuellanka.systemmanager.dto;

import com.autofuellanka.systemmanager.model.BookingType;
import jakarta.validation.constraints.NotNull;

public class BookingCreateRequest {
    // ISO strings are fine for uni project (store as String in entity if you want)
    public String startTime;     // e.g., "2025-10-05T10:30"
    public String endTime;       // optional


    @NotNull
    public BookingType type;     // FUEL or SERVICE

    // Fuel booking info
    public String fuelType;      // e.g., "PETROL" | "DIESEL"
    public Double litersRequested;

    @NotNull
    public Long locationId;

    public Long vehicleId;

    // Service booking info
    public Long serviceTypeId;
}
