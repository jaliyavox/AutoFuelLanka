package com.autofuellanka.systemmanager.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.Set;

public record UserCreateRequest(
        @Email @NotBlank String email,
        @NotBlank @Size(min = 3, max = 120) String fullName,
        @NotBlank @Size(min = 6, max = 64) String password,
        String phone,
        String address,
        Boolean enabled,
        Set<String> roles // e.g. ["IT_EXEC","FRONT_DESK"] or ["CUSTOMER"]
) {}
