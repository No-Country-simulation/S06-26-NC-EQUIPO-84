package com.bit.backend.dtos;

import lombok.Builder;

import java.time.LocalDate;

@Builder
public record RegisterRequest(
        String email,
        String password,
        String name,
        String whatsapp,
        LocalDate birthDate,
        String gender,
        String education,
        String continent,
        String country,
        String state,
        String city,
        String level,
        String area,
        String goal,
        Integer onboardingStep
) {}