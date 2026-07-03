package com.bit.backend.controllers;


import com.bit.backend.dtos.SaludRequest;
import com.bit.backend.dtos.SaludResponse;
import com.bit.backend.services.SaludService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/salud")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")

public class SaludController {

    private final SaludService saludService;

    @PostMapping
    public ResponseEntity<SaludResponse> evaluarSaludMental(@RequestBody SaludRequest request) {
        SaludResponse response = saludService.procesarCheckIn(request);
        return ResponseEntity.ok(response);
    }
    }