package com.bit.backend.controllers;

import com.bit.backend.dtos.OrientarRequest;
import com.bit.backend.dtos.OrientarResponse;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/orientar")
@CrossOrigin(origins = "*") // Permite que React se conecte sin problemas de CORS
public class OrientacionController {

    @PostMapping
    public OrientarResponse orientarUsuario(@RequestBody OrientarRequest request) {
        // MOCK: Datos fijos para que el frontend pueda trabajar ya mismo
        return new OrientarResponse(
                70,
                List.of("AWS", "Docker", "Inglés Técnico"),
                "Trayectoria sugerida: Cloud Computing con el Programa GEAR de Google Cloud.",
                List.of("Vacante Dev Cloud Junior - Empresa X", "Soporte Cloud - Empresa Y"),
                0.95
        );
    }
}