package com.bit.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "_user", uniqueConstraints = {@UniqueConstraint(columnNames = {"email"})})
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Autenticación básica
    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    // Información de Registro / Onboarding
    private String name; // Mapea con 'name' de React
    private String whatsapp;
    private LocalDate birthDate; // Mapea con 'birthDate' (Date estándar de HTML)
    private String gender;

    // Ubicación
    private String continent;
    private String country;
    private String state;
    private String city;

    // Datos profesionales / Objetivos (Orientación y Salud)
    private String education;
    private String level;
    private String area;
    private String goal;

    private Integer onboardingStep;

    @Enumerated(EnumType.STRING)
    private Role role;

    // Métodos de UserDetails (Spring Security)
    @Override public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override public boolean isAccountNonExpired() { return true; }
    @Override public boolean isAccountNonLocked() { return true; }
    @Override public boolean isCredentialsNonExpired() { return true; }
    @Override public boolean isEnabled() { return true; }
}
