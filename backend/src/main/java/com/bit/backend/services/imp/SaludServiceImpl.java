package com.bit.backend.services.imp;

import com.bit.backend.dtos.SaludRequest;
import com.bit.backend.dtos.SaludResponse;
import com.bit.backend.model.MentalHealthRecord;
import com.bit.backend.model.User;
import com.bit.backend.repository.MentalHealthRepository;
import com.bit.backend.repository.UserRepository;
import com.bit.backend.services.SaludService;
import lombok.RequiredArgsConstructor;

import org.springframework.ai.google.genai.GoogleGenAiChatModel;
import org.springframework.stereotype.Service;

import java.util.UUID;

@RequiredArgsConstructor
@Service
public class SaludServiceImpl implements SaludService {

    private final GoogleGenAiChatModel chatModel;
    private final UserRepository userRepository;
    private final MentalHealthRepository mentalHealthRepository;

    @Override
    public SaludResponse procesarCheckIn(SaludRequest request) {
        // 1. Buscar al usuario real por email
        User user = userRepository.findByEmail(request.usuario_id())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // 2. Definir valores para el prompt (usando los datos reales del objeto User)
        String humorUsuario = request.humor() != null ? request.humor() : "Normal";
        int nota = request.nota_semanal();

        // 3. Control de crisis (Regla de negocio: nota < 4)
        boolean derivarCvv = nota < 4;
        String mensaje;
        String accionSugerida;

        if (derivarCvv) {
            mensaje = "Hola " + user.getName() + ", veo que las cosas están siendo difíciles para ti. No estás solo.";
            accionSugerida = "Por favor, contacta con el CVV (Centro de Valorización de la Vida). Estamos contigo.";
        } else {
            // 4. Generación inteligente mediante IA con el "Prompt Maestro"
            String respuestaIA = generarRespuestaIA(user, humorUsuario, nota);

            // Separación por pipe '|'
            String[] partes = respuestaIA.contains("|") ? respuestaIA.split("\\|") : new String[]{respuestaIA, "Tómate un momento para respirar."};
            mensaje = partes[0].trim();
            accionSugerida = partes[1].trim();
        }

        // 5. Persistencia en Base de Datos
        MentalHealthRecord record = MentalHealthRecord.builder()
                .user(user)
                .humor(humorUsuario)
                .nota_semanal(nota)
                .contexto(request.contexto()) // Guardado directo como JSONB en Postgres
                .conversationId(UUID.randomUUID().toString())
                .build();

        mentalHealthRepository.save(record);

        // 6. Retorno al Frontend
        return new SaludResponse(mensaje, accionSugerida, derivarCvv, nota, derivarCvv);
    }

    private String generarRespuestaIA(User user, String humor, int nota) {
        try {
            String prompt = String.format(
                    "Eres el agente de IA empático del ecosistema 'App BiT'. " +
                            "El usuario es %s, reside en %s, %s. " +
                            "Tiene como enfoque profesional el área de '%s' y su meta personal es '%s'. " +
                            "Ha registrado hoy un humor '%s' y calificado su bienestar de la semana con un %d sobre 10. " +
                            "Genera una respuesta en español dividida estrictamente por el carácter '|' en dos partes: " +
                            "Parte 1: Mensaje corto, humano y empático (máximo 2 frases). " +
                            "Parte 2: Una sugerencia de bienestar o salud mental accionable y breve acorde a su estado.",
                    user.getName(), user.getCity(), user.getCountry(),
                    user.getArea(), user.getGoal(), humor, nota
            );
            return chatModel.call(prompt);
        } catch (Exception e) {
            return "¡Qué bien que sigas adelante, " + user.getName() + "! | Escucha un podcast inspirador para recargar energías.";
        }
    }
}