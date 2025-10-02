package com.autofuellanka.systemmanager.dto;


import jakarta.validation.constraints.Size;
import java.util.Set;

public record UserUpdateRequest(
        @Size(min = 3, max = 120) String fullName,
        String phone,
        String address,
        Boolean enabled,
        Set<String> roles,
        String password
) {}
