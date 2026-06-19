package com.bit.backend.dtos;
import java.util.List;
import java.util.Map;

public record OrientarRequest(
        String usuarioId,
        Map<String, Object> perfil,
        String nivel,
        String region,
        String idioma,
        Double lat,
        Double lng
) {}