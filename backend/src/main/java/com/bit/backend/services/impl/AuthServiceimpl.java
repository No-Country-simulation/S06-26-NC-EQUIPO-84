package com.bit.backend.services.impl;


import com.bit.backend.dtos.AuthResponse;
import com.bit.backend.dtos.LoginRequest;
import com.bit.backend.dtos.RegisterRequest;
import com.bit.backend.model.User;
import com.bit.backend.repository.UserRepository;
import com.bit.backend.services.AuthService;
import com.bit.backend.services.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceimpl implements AuthService {
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    @Override
    public AuthResponse register(RegisterRequest request) {
        User user = User.builder()
                .email(request.email())
                .password(passwordEncoder.encode(request.password())) // 👈 ¡Contraseña encriptada para MySQL!
                .name(request.name()) // Conectado con tu ajuste del front
                .whatsapp(request.whatsapp())
                .birthDate(request.birthDate())
                .gender(request.gender())
                .education(request.education())
                .continent(request.continent())
                .country(request.country())
                .state(request.state())
                .city(request.city())
                .level(request.level())
                .area(request.area())
                .goal(request.goal())
                .onboardingStep(request.onboardingStep())
                .role(com.bit.backend.model.Role.USER) // O el rol por defecto que maneje tu entidad
                .build();

        // Guardamos en la base de datos
        userRepository.save(user);

        // Generamos el token de una vez para que quede logueado al registrarse
        String jwtToken = jwtService.generateToken(user);

        // Retornamos el token envuelto en el DTO AuthResponse
        return new AuthResponse(jwtToken);
    }

    @Override
    public AuthResponse login(LoginRequest request) {
        // 1. Spring Security autentica usando el email que viene del Record de React
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.email(),
                        request.password()
                )
        );

        // 2. Buscamos al usuario en MySQL usando el método por email
        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new IllegalArgumentException("Email o contraseña incorrectos"));

        // 3. Generamos su token de sesión limpio
        String token = jwtService.generateToken(user);

        // 4. Retornamos el Record instanciándolo directamente
        return new AuthResponse(token);
    }
}


















