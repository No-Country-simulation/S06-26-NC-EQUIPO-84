package com.bit.backend.exception;

public class NegocioException extends RuntimeException {
    private final ErrorCode errorCode;

    public NegocioException(ErrorCode errorCode) {
        // Aquí es donde pasas el mensaje al padre (RuntimeException)
        super(errorCode.getMensaje());
        this.errorCode = errorCode;
    }

    public ErrorCode getErrorCode() {
        return errorCode;
    }
}
