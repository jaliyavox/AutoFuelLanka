package com.autofuellanka.systemmanager.controller;

import com.autofuellanka.systemmanager.dto.UserSummaryDTO;
import com.autofuellanka.systemmanager.model.User;
import com.autofuellanka.systemmanager.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")   // ← add this line
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository users;

    public UserController(UserRepository users) {
        this.users = users;
    }

    @GetMapping
    public List<UserSummaryDTO> list() {
        return users.findAll().stream()
                .map(this::toDto)
                .toList();
    }

    private UserSummaryDTO toDto(User u) {
        var roleStrings = u.getRoles().stream().map(Enum::name).collect(java.util.stream.Collectors.toSet());
        return new UserSummaryDTO(u.getId(), u.getEmail(), u.getFullName(), u.isEnabled(), roleStrings);
    }
}
