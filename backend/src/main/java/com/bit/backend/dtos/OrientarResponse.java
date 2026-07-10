package com.bit.backend.dtos;
import java.util.List;

public record OrientarResponse(
        int gapPorcentual,
        List<String> gapItems,
        String trayectoriaSugerida,
        List<String> vacantesCompatibles,
        double confianza
) {}