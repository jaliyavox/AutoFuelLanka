// model/Ping.java
package com.autofuellanka.systemmanager.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Ping {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String note;
    // getters/setters
}
