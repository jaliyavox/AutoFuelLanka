package com.autofuellanka.systemmanager.controller;

import com.autofuellanka.systemmanager.dto.AuthLoginRequest;
import com.autofuellanka.systemmanager.dto.AuthRegisterRequest;
import com.autofuellanka.systemmanager.dto.UserSummaryDTO;
import com.autofuellanka.systemmanager.model.RoleCode;
import com.autofuellanka.systemmanager.model.User;
import com.autofuellanka.systemmanager.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final UserRepository users;

    public AuthController(UserRepository users) {
        this.users = users;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody AuthRegisterRequest req) {
        if (users.existsByEmailIgnoreCase(req.getEmail())) {
            return ResponseEntity.badRequest().body("Email already registered.");
        }

        User u = new User();
        u.setEmail(req.getEmail().trim().toLowerCase());
        u.setPasswordHash(req.getPassword()); // plaintext (per uni project)
        u.setFullName(req.getFullName());
        u.setPhone(req.getPhone());
        u.setAddress(req.getAddress());
        u.setEnabled(true);
        u.setRoles(Set.of(RoleCode.CUSTOMER));

        try {
            User saved = users.save(u);
            return ResponseEntity.ok(toDto(saved)); // ← map to record fields
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.badRequest().body("Email already registered.");
        }
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody AuthLoginRequest req) {
        User u = users.findByEmailIgnoreCase(req.getEmail());
        if (u == null) {
            return ResponseEntity.status(401).body("Invalid email or password.");
        }

        // plaintext check (per uni project)
        if (!u.getPasswordHash().equals(req.getPassword())) {
            return ResponseEntity.status(401).body("Invalid email or password.");
        }

        if (!u.isEnabled()) {
            return ResponseEntity.status(403).body("Account disabled.");
        }

        return ResponseEntity.ok(toDto(u));
    }

    // --- Mapper: User -> UserSummaryDTO (record expects fields, not entity)
    private UserSummaryDTO toDto(User u) {
        Set<String> roleStrings = u.getRoles()
                .stream()
                .map(Enum::name)
                .collect(Collectors.toSet());

        return new UserSummaryDTO(
                u.getId(),
                u.getEmail(),
                u.getFullName(),
                u.getPhone(),
                u.getAddress(),
                u.isEnabled(),
                roleStrings
        );
    }
}
