package com.bit.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDateTime;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "mental_health_records")
public class MentalHealthRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Relación con el User
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private String humor;

    // Mantenemos el nombre igual al del DTO para coherencia total
    @Column(name = "nota_semanal")
    private int nota_semanal;

    // El contexto tal cual viene del front
    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "contexto")
    private Map<String, Object> contexto;

    @Column(name = "conversation_id")
    private String conversationId;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}
