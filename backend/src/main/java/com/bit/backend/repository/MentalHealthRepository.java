package com.bit.backend.repository;

import com.bit.backend.model.MentalHealthRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MentalHealthRepository extends JpaRepository<MentalHealthRecord, Long> {

    // 1. Buscar todo el historial de un usuario específico (ordenado por fecha)
    // Esto es lo que usarás para generar el "Gráfico de Bienestar"
    List<MentalHealthRecord> findByUser_IdOrderByCreatedAtAsc(Long userId);

    // 2. Buscar una conversación específica por su ID
    // Esto es lo que usarás cuando el usuario presione "Continuar charla"
    List<MentalHealthRecord> findByConversationIdOrderByCreatedAtAsc(String conversationId);
}