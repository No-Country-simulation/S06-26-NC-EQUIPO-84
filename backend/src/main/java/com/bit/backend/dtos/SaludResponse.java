package com.bit.backend.dtos;

public record SaludResponse(
        String mensaje,
        String accion_sugerida,
        boolean derivar_cvv,
        int nota_actual,
        boolean alerta
) {}