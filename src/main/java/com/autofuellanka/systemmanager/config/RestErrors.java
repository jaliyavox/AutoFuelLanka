package com.autofuellanka.systemmanager.config;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestControllerAdvice
public class RestErrors {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> onValidation(MethodArgumentNotValidException ex) {
        var first = ex.getBindingResult().getFieldErrors().stream().findFirst();
        var msg = first.map(f -> f.getField() + ": " + f.getDefaultMessage()).orElse("Validation error");
        return ResponseEntity.badRequest().body(Map.of("error", msg));
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<?> onIllegal(IllegalArgumentException ex) {
        return ResponseEntity.badRequest().body(Map.of("error", ex.getMessage()));
    }
}
