package com.autofuellanka.systemmanager.controller;

import com.autofuellanka.systemmanager.dto.UserCreateRequest;
import com.autofuellanka.systemmanager.dto.UserUpdateRequest;
import com.autofuellanka.systemmanager.dto.UserSummaryDTO;
import com.autofuellanka.systemmanager.model.RoleCode;
import com.autofuellanka.systemmanager.model.User;
import com.autofuellanka.systemmanager.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository users;

    public UserController(UserRepository users) {
        this.users = users;
    }

    // ---- GET: list all users
    @GetMapping(produces = "application/json")
    public List<UserSummaryDTO> list() {
        return users.findAll().stream().map(this::toDto).toList();
    }

    // ---- GET: single user
    @GetMapping(path = "/{id}", produces = "application/json")
    public UserSummaryDTO getOne(@PathVariable Long id) {
        var u = users.findById(id).orElseThrow(() -> new IllegalArgumentException("User not found"));
        return toDto(u);
    }

    // ---- POST: create user
    @PostMapping(consumes = "application/json", produces = "application/json")
    public UserSummaryDTO create(@RequestBody @Valid UserCreateRequest req) {
        if (users.existsByEmail(req.email())) {
            throw new IllegalArgumentException("Email already exists");
        }

        Set<RoleCode> roleEnums = new HashSet<>();
        if (req.roles() != null && !req.roles().isEmpty()) {
            for (String r : req.roles()) {
                roleEnums.add(RoleCode.valueOf(r.trim().toUpperCase()));
            }
        } else {
            roleEnums.add(RoleCode.CUSTOMER);
        }

        User u = new User();
        u.setEmail(req.email());
        u.setPasswordHash("{noop}" + req.password()); // simple for uni project
        u.setFullName(req.fullName());
        u.setPhone(req.phone());
        u.setAddress(req.address());
        u.setEnabled(req.enabled() == null ? true : req.enabled());
        u.setRoles(roleEnums);

        return toDto(users.save(u));
    }

    // ---- PUT: update user
    @PutMapping(path = "/{id}", consumes = "application/json", produces = "application/json")
    public UserSummaryDTO update(@PathVariable Long id, @RequestBody @Valid UserUpdateRequest req) {
        var u = users.findById(id).orElseThrow(() -> new IllegalArgumentException("User not found"));

        if (req.fullName() != null && !req.fullName().isBlank()) u.setFullName(req.fullName());
        if (req.phone() != null) u.setPhone(req.phone());
        if (req.address() != null) u.setAddress(req.address());
        if (req.enabled() != null) u.setEnabled(req.enabled());

        if (req.roles() != null && !req.roles().isEmpty()) {
            var roleEnums = new HashSet<RoleCode>();
            for (String r : req.roles()) {
                roleEnums.add(RoleCode.valueOf(r.trim().toUpperCase()));
            }
            u.setRoles(roleEnums);
        }

        if (req.password() != null && !req.password().isBlank()) {
            u.setPasswordHash("{noop}" + req.password());
        }

        return toDto(users.save(u));
    }

    // ---- DELETE: remove user
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        if (!users.existsById(id)) throw new IllegalArgumentException("User not found");
        users.deleteById(id);
    }

    // ---- mapper
    private UserSummaryDTO toDto(User u) {
        var roleStrings = u.getRoles().stream().map(Enum::name).collect(Collectors.toSet());
        return new UserSummaryDTO(u.getId(), u.getEmail(), u.getFullName(), u.isEnabled(), roleStrings);
    }
}
