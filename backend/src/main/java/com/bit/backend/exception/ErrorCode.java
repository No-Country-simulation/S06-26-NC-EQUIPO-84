package com.bit.backend.exception;

public enum ErrorCode {
    // ... otros errores
    USUARIO_NO_ENCONTRADO("ERR-004", "Usuario no encontrado");

    private final String codigo;
    private final String mensaje;

    ErrorCode(String codigo, String mensaje) {
        this.codigo = codigo;
        this.mensaje = mensaje;
    }

    public String getCodigo() {
        return codigo;
    }

    public String getMensaje() {
        return mensaje;
    }
}
