
package com.autofuellanka.systemmanager.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
@Table(name="vehicles")
public class Vehicle {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank private String make;
    @NotBlank private String model;
    @NotBlank private String registrationNo;

    @ManyToOne(optional = false)
    private User owner;

    // getters/setters
}
