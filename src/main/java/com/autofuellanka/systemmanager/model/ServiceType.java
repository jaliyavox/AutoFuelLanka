
package com.autofuellanka.systemmanager.model;

import jakarta.persistence.*;

@Entity
@Table(name="service_types")
public class ServiceType {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String code;     // e.g., "OIL_CHANGE"
    private String label;    // "Oil Change"
    private double basePrice;
}
