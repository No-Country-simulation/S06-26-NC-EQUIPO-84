package com.bit.backend.controllers;


import com.bit.backend.dtos.AuthResponse;
import com.bit.backend.dtos.LoginRequest;
import com.bit.backend.dtos.RegisterRequest;
import com.bit.backend.services.imp.AuthServiceimpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AuthController {
    private final AuthServiceimpl authServiceimpl;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authServiceimpl.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(authServiceimpl.login(request));
    }
}