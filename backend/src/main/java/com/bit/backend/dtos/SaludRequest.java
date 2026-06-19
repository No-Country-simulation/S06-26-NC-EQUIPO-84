package com.bit.backend.dtos;

public record SaludRequest(
        String usuarioId,
        String humor,
        int notaSemanal,
        String contexto
) {}