package com.bit.backend.config;

import com.google.genai.Client;
import org.springframework.ai.google.genai.GoogleGenAiChatModel;
import org.springframework.ai.google.genai.GoogleGenAiChatOptions;
import org.springframework.ai.model.google.genai.autoconfigure.chat.GoogleGenAiChatProperties;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GeminiConfig {

    @Bean
    public GoogleGenAiChatModel googleGenAiChatModel() {
        // Leemos la variable directamente del sistema operativo (falla cero)
        String apiKey = System.getenv("GEMINI_API_KEY");

        // Si por alguna razón sigue vacía, le ponemos un plan B (Hardcoded temporal)
        if (apiKey == null || apiKey.isEmpty()) {
            apiKey = "TU_API_KEY_REAL_AQUÍ";
        }

        com.google.genai.Client googleClient = com.google.genai.Client.builder()
                .apiKey(apiKey)
                .build();

        GoogleGenAiChatOptions options = GoogleGenAiChatOptions.builder()
                .model("gemini-2.5-flash")
                .build();

        return GoogleGenAiChatModel.builder()
                .genAiClient(googleClient)
                .defaultOptions(options)
                .build();
    }
}
