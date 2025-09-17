
package com.autofuellanka.systemmanager.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.*;

@Entity
@Table(name="feedback")
public class Feedback {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false) private User customer;
    @ManyToOne(optional = false) private Booking booking;

    @Min(1) @Max(5)
    private int rating;

    @Size(max = 1000)
    private String comment;

    private LocalDateTime createdAt = LocalDateTime.now();
}
