package com.autofuellanka.systemmanager.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
@Table(name="vehicles")
public class Vehicle {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String make;

    @NotBlank
    private String model;

    @NotBlank
    private String registrationNo;

    @ManyToOne(optional = false)
    private User owner;

    // Constructors
    public Vehicle() {}

    public Vehicle(String make, String model, String registrationNo, User owner) {
        this.make = make;
        this.model = model;
        this.registrationNo = registrationNo;
        this.owner = owner;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getMake() { return make; }
    public void setMake(String make) { this.make = make; }

    public String getModel() { return model; }
    public void setModel(String model) { this.model = model; }

    public String getRegistrationNo() { return registrationNo; }
    public void setRegistrationNo(String registrationNo) { this.registrationNo = registrationNo; }

    public User getOwner() { return owner; }
    public void setOwner(User owner) { this.owner = owner; }
}
