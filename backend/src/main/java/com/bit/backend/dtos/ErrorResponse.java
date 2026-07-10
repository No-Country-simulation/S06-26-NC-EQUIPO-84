package com.bit.backend.dtos;

import java.time.LocalDateTime;

public record ErrorResponse(
        String codigo,
        String mensaje,
        LocalDateTime fecha
) {}