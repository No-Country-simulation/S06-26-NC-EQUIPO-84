package com.bit.backend.controllers;

import com.bit.backend.dtos.SaludRequest;
import com.bit.backend.dtos.SaludResponse;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/salud")
@CrossOrigin(origins = "*")
public class SaludController {

    @PostMapping
    public SaludResponse procesarSalud(@RequestBody SaludRequest request) {
        // Lógica obligatoria del MVP: Si la nota es menor a 4, se activa el trigger del CVV
        if (request.notaSemanal() < 4) {
            return new SaludResponse(
                    "Detectamos que estás pasando por un momento muy difícil. No estás solo. Queremos ayudarte.",
                    "Por favor, comunícate con el Centro de Valorización de la Vida (CVV) de inmediato.",
                    true, // derivarCvv: true
                    request.notaSemanal(),
                    "ALERTA_CRISIS"
            );
        }

        // Mock normal si el usuario está bien
        return new SaludResponse(
                "Entendemos que te sientas un poco cansado hoy. Es normal en el proceso de aprendizaje.",
                "Te sugerimos tomar un descanso de 15 minutos y caminar descalzo en el pasto.",
                false,
                request.notaSemanal(),
                "NORMAL"
        );
    }
}