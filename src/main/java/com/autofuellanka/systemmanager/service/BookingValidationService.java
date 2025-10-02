package com.autofuellanka.systemmanager.service;

import com.autofuellanka.systemmanager.model.Booking;
import com.autofuellanka.systemmanager.model.BookingStatus;
import com.autofuellanka.systemmanager.model.BookingType;
import com.autofuellanka.systemmanager.model.RoleCode;

public interface BookingValidationService {

    /** Customer can edit/delete only if owns AND booking is PENDING */
    void requireCustomerOwnsPending(Long customerId, Booking booking);

    /** For SERVICE bookings: serviceTypeId must be present & valid; fuel fields must be null/ignored */
    void ensureServiceBookingFields(BookingType type, Long serviceTypeId);

    /** Enforce legal status transitions based on actor's role */
    void ensureStatusTransitionAllowed(RoleCode actorRole, BookingStatus from, BookingStatus to);
}
