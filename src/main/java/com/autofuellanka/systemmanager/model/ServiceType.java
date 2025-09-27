package com.autofuellanka.systemmanager.model;

import jakarta.persistence.*;

@Entity
@Table(name="service_types")
public class ServiceType {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String code;
    private String label;
    private double basePrice;

    // Constructors
    public ServiceType() {}

    public ServiceType(String code, String label, double basePrice) {
        this.code = code;
        this.label = label;
        this.basePrice = basePrice;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }

    public String getLabel() { return label; }
    public void setLabel(String label) { this.label = label; }

    public double getBasePrice() { return basePrice; }
    public void setBasePrice(double basePrice) { this.basePrice = basePrice; }
}