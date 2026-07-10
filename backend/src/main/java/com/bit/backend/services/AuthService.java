package com.bit.backend.services;


import com.bit.backend.dtos.AuthResponse;
import com.bit.backend.dtos.LoginRequest;
import com.bit.backend.dtos.RegisterRequest;

public interface AuthService {
    AuthResponse register(RegisterRequest request);
    AuthResponse login(LoginRequest request);
}
