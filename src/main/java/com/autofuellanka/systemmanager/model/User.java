package com.autofuellanka.systemmanager.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;   // ← add this

import java.time.Instant;
import java.util.Set;

@Entity
@Table(name = "users")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 255)
    private String email;

    @Column(name = "password_hash", nullable = false, length = 255)
    private String passwordHash;

    @Column(name = "full_name", nullable = false, length = 120)
    private String fullName;

    @Column(length = 40)
    private String phone;

    @Column(length = 255)
    private String address;

    @Column(nullable = false)
    private boolean enabled = true;

    @CreationTimestamp                                    // ← let Hibernate fill it
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;                            // ← remove the "= Instant.now()"

    // Store roles as an enum collection (no separate roles table needed)
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"))
    @Enumerated(EnumType.STRING)
    @Column(name = "role_code", nullable = false, length = 50)
    private Set<RoleCode> roles;
}
