package com.autofuellanka.systemmanager.controller;

import com.autofuellanka.systemmanager.dto.BookingCreateRequest;
import com.autofuellanka.systemmanager.dto.BookingDTO;
import com.autofuellanka.systemmanager.model.Booking;
import com.autofuellanka.systemmanager.model.BookingStatus;
import com.autofuellanka.systemmanager.repository.BookingRepository;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customers/{customerId}/bookings")
@CrossOrigin(origins = "http://localhost:5173")
public class CustomerBookingController {

    private final BookingRepository bookingRepo;

    public CustomerBookingController(BookingRepository bookingRepo) {
        this.bookingRepo = bookingRepo;
    }

    // --- List bookings for a customer
    @GetMapping(produces = "application/json")
    public List<BookingDTO> list(@PathVariable Long customerId) {
        return bookingRepo.findByCustomerId(customerId).stream()
                .map(BookingDTO::new)
                .toList();
    }

    // --- Create booking
    @PostMapping(consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> create(
            @PathVariable Long customerId,
            @Valid @RequestBody BookingCreateRequest req
    ) {
        Booking b = new Booking();
        b.setCustomerId(customerId);
        b.setStartTime(req.startTime);
        b.setEndTime(req.endTime);
        b.setType(req.type);                     // enum BookingType
        b.setFuelType(req.fuelType);
        b.setLitersRequested(req.litersRequested);
        b.setStatus(BookingStatus.PENDING);      // enum BookingStatus
        b.setLocationId(req.locationId);
        b.setVehicleId(req.vehicleId);
        b.setServiceTypeId(req.serviceTypeId);

        Booking saved = bookingRepo.save(b);
        return ResponseEntity.ok(new BookingDTO(saved));
    }

    // --- Update booking (only if still PENDING)
    @PutMapping(path = "/{bookingId}", consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> update(
            @PathVariable Long customerId,
            @PathVariable Long bookingId,
            @Valid @RequestBody BookingCreateRequest req
    ) {
        Booking existing = bookingRepo.findById(bookingId).orElse(null);
        if (existing == null || !existing.getCustomerId().equals(customerId)) {
            return ResponseEntity.notFound().build();
        }
        if (existing.getStatus() != BookingStatus.PENDING) {
            return ResponseEntity.badRequest().body("Cannot edit booking unless status is PENDING");
        }

        existing.setStartTime(req.startTime);
        existing.setEndTime(req.endTime);
        existing.setType(req.type);                  // enum BookingType
        existing.setFuelType(req.fuelType);
        existing.setLitersRequested(req.litersRequested);
        existing.setLocationId(req.locationId);
        existing.setVehicleId(req.vehicleId);
        existing.setServiceTypeId(req.serviceTypeId);

        Booking saved = bookingRepo.save(existing);
        return ResponseEntity.ok(new BookingDTO(saved));
    }

    // --- Delete booking (only if still PENDING)
    @DeleteMapping("/{bookingId}")
    public ResponseEntity<?> delete(
            @PathVariable Long customerId,
            @PathVariable Long bookingId
    ) {
        Booking existing = bookingRepo.findById(bookingId).orElse(null);
        if (existing == null || !existing.getCustomerId().equals(customerId)) {
            return ResponseEntity.notFound().build();
        }
        if (existing.getStatus() != BookingStatus.PENDING) {
            return ResponseEntity.badRequest().body("Cannot delete booking unless status is PENDING");
        }

        bookingRepo.delete(existing);
        return ResponseEntity.noContent().build();
    }
}
