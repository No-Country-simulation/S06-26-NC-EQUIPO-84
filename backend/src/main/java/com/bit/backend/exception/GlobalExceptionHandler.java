package com.bit.backend.exception;

import com.bit.backend.dtos.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(NegocioException.class)
    public ResponseEntity<ErrorResponse> handleNegocioException(NegocioException ex) {
        ErrorCode code = ex.getErrorCode();

        // Creamos el record de respuesta
        ErrorResponse response = new ErrorResponse(
                code.getCodigo(),
                code.getMensaje(),
                LocalDateTime.now()
        );

        // Retornamos el 404 porque el recurso no existe
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }
}
