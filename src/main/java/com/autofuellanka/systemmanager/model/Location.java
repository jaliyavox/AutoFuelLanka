package com.autofuellanka.systemmanager.model;

import jakarta.persistence.*;

@Entity
@Table(name="locations")
public class Location {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String address;

    @Enumerated(EnumType.STRING)
    private LocationType type;

    // Constructors
    public Location() {}

    public Location(String name, String address, LocationType type) {
        this.name = name;
        this.address = address;
        this.type = type;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public LocationType getType() { return type; }
    public void setType(LocationType type) { this.type = type; }
}