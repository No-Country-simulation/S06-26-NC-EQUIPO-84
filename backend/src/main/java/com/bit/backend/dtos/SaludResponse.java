package com.bit.backend.dtos;

public record SaludResponse(
        String mensaje,
        String accionSugerida,
        boolean derivarCvv,
        int notaActual,
        String alerta
) {}