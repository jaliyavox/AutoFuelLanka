package com.autofuellanka.systemmanager.repository;

import com.autofuellanka.systemmanager.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    // Find all bookings by customer
    List<Booking> findByCustomerId(Long customerId);
}
