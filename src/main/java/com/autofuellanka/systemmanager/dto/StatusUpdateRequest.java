package com.autofuellanka.systemmanager.dto;

import com.autofuellanka.systemmanager.model.BookingStatus;

public class StatusUpdateRequest {
    public BookingStatus status;   // APPROVED | REJECTED | IN_PROGRESS | COMPLETED
    public String note;            // optional
}
