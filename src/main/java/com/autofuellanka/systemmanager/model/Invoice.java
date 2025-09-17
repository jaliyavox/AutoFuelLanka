
package com.autofuellanka.systemmanager.model;

import jakarta.persistence.*;
import java.time.*;

@Entity
@Table(name="invoices", indexes = @Index(columnList = "createdAt"))
public class Invoice {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false) private User createdBy; // Finance staff
    @OneToOne(optional = false)  private Booking booking;

    private double amount;
    private double tax;
    private double discount;
    private double total;

    private boolean paid;
    private LocalDateTime createdAt = LocalDateTime.now();
}
