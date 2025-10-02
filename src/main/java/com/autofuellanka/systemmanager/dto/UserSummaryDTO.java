package com.autofuellanka.systemmanager.dto;

import java.util.Set;

public record UserSummaryDTO(
        Long id,
        String email,
        String fullName,
        boolean enabled,
        Set<String> roles
) {}
