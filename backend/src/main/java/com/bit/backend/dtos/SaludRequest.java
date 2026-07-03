package com.bit.backend.dtos;

import java.util.Map;

public record SaludRequest(
        String usuario_id,
        String humor,
        int nota_semanal,
        Map<String, Object> contexto
) {}