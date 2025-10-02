package com.autofuellanka.systemmanager.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "service_types")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor @Builder
public class ServiceType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String code;   // e.g., OIL_CHANGE, FULL_SERVICE

    @Column(nullable = false)
    private String label;  // e.g., "Oil Change"

    @Column(name = "base_price", nullable = false)
    private Double basePrice;
}
