package com.decisionarena.web;

import com.decisionarena.support.AiIntegrationException;
import com.decisionarena.support.NotFoundException;
import com.decisionarena.support.RateLimitExceededException;
import com.decisionarena.support.SensitiveTopicException;
import com.decisionarena.support.ValidationException;
import com.decisionarena.web.dto.ErrorResponse;
import jakarta.validation.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.Instant;

@RestControllerAdvice
public class ApiExceptionHandler {

    @ExceptionHandler({ValidationException.class, MethodArgumentNotValidException.class, ConstraintViolationException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleBadRequest(Exception exception) {
        return new ErrorResponse("bad_request", extractMessage(exception), Instant.now());
    }

    @ExceptionHandler(SensitiveTopicException.class)
    @ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
    public ErrorResponse handleSensitiveTopic(SensitiveTopicException exception) {
        return new ErrorResponse("sensitive_topic", exception.getMessage(), Instant.now());
    }

    @ExceptionHandler(NotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorResponse handleNotFound(NotFoundException exception) {
        return new ErrorResponse("not_found", exception.getMessage(), Instant.now());
    }

    @ExceptionHandler(RateLimitExceededException.class)
    @ResponseStatus(HttpStatus.TOO_MANY_REQUESTS)
    public ErrorResponse handleRateLimit(RateLimitExceededException exception) {
        return new ErrorResponse("rate_limited", exception.getMessage(), Instant.now());
    }

    @ExceptionHandler(AiIntegrationException.class)
    @ResponseStatus(HttpStatus.BAD_GATEWAY)
    public ErrorResponse handleAi(AiIntegrationException exception) {
        return new ErrorResponse("ai_error", exception.getMessage(), Instant.now());
    }

    private String extractMessage(Exception exception) {
        if (exception instanceof MethodArgumentNotValidException methodArgumentNotValidException
                && methodArgumentNotValidException.getBindingResult().getFieldError() != null) {
            return methodArgumentNotValidException.getBindingResult().getFieldError().getDefaultMessage();
        }
        return exception.getMessage() == null ? "Request validation failed." : exception.getMessage();
    }
}
