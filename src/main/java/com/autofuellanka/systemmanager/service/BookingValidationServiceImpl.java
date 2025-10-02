package com.autofuellanka.systemmanager.service;

import com.autofuellanka.systemmanager.model.Booking;
import com.autofuellanka.systemmanager.model.BookingStatus;
import com.autofuellanka.systemmanager.model.BookingType;
import com.autofuellanka.systemmanager.model.RoleCode;
import com.autofuellanka.systemmanager.repository.ServiceTypeRepository;
import org.springframework.stereotype.Service;

@Service
public class BookingValidationServiceImpl implements BookingValidationService {

    private final ServiceTypeRepository serviceTypes;

    public BookingValidationServiceImpl(ServiceTypeRepository serviceTypes) {
        this.serviceTypes = serviceTypes;
    }

    @Override
    public void requireCustomerOwnsPending(Long customerId, Booking booking) {
        if (booking == null)
            throw new IllegalArgumentException("Booking not found");
        if (booking.getCustomerId() == null || !booking.getCustomerId().equals(customerId))
            throw new IllegalStateException("Forbidden: not your booking");
        if (booking.getStatus() != BookingStatus.PENDING)
            throw new IllegalStateException("Booking is locked after approval/rejection");
    }

    @Override
    public void ensureServiceBookingFields(BookingType type, Long serviceTypeId) {
        if (type == BookingType.SERVICE) {
            if (serviceTypeId == null)
                throw new IllegalArgumentException("serviceTypeId is required for SERVICE bookings");
            if (!serviceTypes.existsById(serviceTypeId))
                throw new IllegalArgumentException("Invalid serviceTypeId: " + serviceTypeId);
        }
        // For FUEL: nothing special here (fuel fields validated elsewhere if needed)
    }

    @Override
    public void ensureStatusTransitionAllowed(RoleCode actorRole, BookingStatus from, BookingStatus to) {
        if (from == to)
            return; // no-op

        // Allowed transitions:
        // PENDING -> APPROVED/REJECTED  (Front Desk, Ops)
        // APPROVED -> IN_PROGRESS       (Technician, Ops)
        // IN_PROGRESS -> COMPLETED      (Technician, Ops)

        switch (from) {
            case PENDING -> {
                if (to == BookingStatus.APPROVED || to == BookingStatus.REJECTED) {
                    requireRole(actorRole, RoleCode.FRONT_DESK, RoleCode.OPS_MANAGER);
                    return;
                }
            }
            case APPROVED -> {
                if (to == BookingStatus.IN_PROGRESS) {
                    requireRole(actorRole, RoleCode.TECHNICIAN, RoleCode.OPS_MANAGER);
                    return;
                }
            }
            case IN_PROGRESS -> {
                if (to == BookingStatus.COMPLETED) {
                    requireRole(actorRole, RoleCode.TECHNICIAN, RoleCode.OPS_MANAGER);
                    return;
                }
            }
            default -> {}
        }

        throw new IllegalStateException("Illegal status transition: " + from + " -> " + to);
    }

    private void requireRole(RoleCode actorRole, RoleCode... allowed) {
        for (RoleCode code : allowed) {
            if (code == actorRole) return;
        }
        throw new IllegalStateException("Role " + actorRole + " not permitted for this transition");
    }
}
