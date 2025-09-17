
package com.autofuellanka.systemmanager.model;

import jakarta.persistence.*;
import java.time.*;

@Entity
@Table(name="jobs")
public class Job {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(optional = false) private Booking booking;

    @ManyToOne(optional = false) private User technician; // role TECHNICIAN

    @Enumerated(EnumType.STRING)
    private JobStatus status = JobStatus.QUEUED;

    private String notes;
    private LocalDateTime assignedAt = LocalDateTime.now();
    private LocalDateTime completedAt;
}
