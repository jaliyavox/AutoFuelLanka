package com.autofuellanka.systemmanager.controller;

import com.autofuellanka.systemmanager.dto.BookingDTO;
import com.autofuellanka.systemmanager.dto.StatusUpdateRequest;
import com.autofuellanka.systemmanager.model.Booking;
import com.autofuellanka.systemmanager.model.BookingStatus;
import com.autofuellanka.systemmanager.model.BookingType;
import com.autofuellanka.systemmanager.model.RoleCode;
import com.autofuellanka.systemmanager.repository.BookingRepository;
import com.autofuellanka.systemmanager.service.BookingValidationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/staff/bookings")
@CrossOrigin(origins = "http://localhost:5173")
public class StaffBookingController {

    private final BookingRepository bookingRepo;
    private final BookingValidationService validator;

    public StaffBookingController(BookingRepository bookingRepo,
                                  BookingValidationService validator) {
        this.bookingRepo = bookingRepo;
        this.validator = validator;
    }

    // --- List with optional filters: ?type=SERVICE&status=PENDING
    @GetMapping(produces = "application/json")
    public List<BookingDTO> list(@RequestParam(required = false) BookingType type,
                                 @RequestParam(required = false) BookingStatus status) {
        return bookingRepo.findAll().stream()
                .filter(b -> type == null || b.getType() == type)
                .filter(b -> status == null || b.getStatus() == status)
                .map(BookingDTO::new)
                .toList();
    }

    // --- Update status: PATCH /api/staff/bookings/{bookingId}/status?actorRole=FRONT_DESK
    @PatchMapping(path = "/{bookingId}/status", consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> updateStatus(@PathVariable Long bookingId,
                                          @RequestParam RoleCode actorRole,
                                          @RequestBody StatusUpdateRequest req) {
        Booking b = bookingRepo.findById(bookingId).orElse(null);
        if (b == null) return ResponseEntity.notFound().build();

        // validate transition by role
        validator.ensureStatusTransitionAllowed(actorRole, b.getStatus(), req.status);

        b.setStatus(req.status);
        Booking saved = bookingRepo.save(b);

        return ResponseEntity.ok(new BookingDTO(saved));
    }
}
