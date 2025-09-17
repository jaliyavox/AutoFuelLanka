
package com.autofuellanka.systemmanager.model;

import jakarta.persistence.*;

@Entity
@Table(name="locations")
public class Location {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;        // e.g., "Colombo 05"
    private String address;
    @Enumerated(EnumType.STRING)
    private LocationType type;
}
