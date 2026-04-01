package com.decisionarena.web;

import com.decisionarena.config.RateLimitProperties;
import com.decisionarena.web.dto.ErrorResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.Instant;
import java.util.ArrayDeque;
import java.util.Deque;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class RateLimitingFilter extends OncePerRequestFilter {

    private final RateLimitProperties rateLimitProperties;
    private final ObjectMapper objectMapper;
    private final Map<String, Deque<Instant>> requestsByIp = new ConcurrentHashMap<>();

    public RateLimitingFilter(RateLimitProperties rateLimitProperties, ObjectMapper objectMapper) {
        this.rateLimitProperties = rateLimitProperties;
        this.objectMapper = objectMapper;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        if (shouldLimit(request)) {
            String clientKey = resolveClientKey(request);
            Deque<Instant> timestamps = requestsByIp.computeIfAbsent(clientKey, ignored -> new ArrayDeque<>());
            Instant cutoff = Instant.now().minusSeconds(rateLimitProperties.windowSeconds());

            synchronized (timestamps) {
                while (!timestamps.isEmpty() && timestamps.peekFirst().isBefore(cutoff)) {
                    timestamps.pollFirst();
                }
                if (timestamps.size() >= rateLimitProperties.maxRequests()) {
                    response.setStatus(429);
                    response.setContentType(MediaType.APPLICATION_JSON_VALUE);
                    objectMapper.writeValue(
                            response.getWriter(),
                            new ErrorResponse("rate_limited", "Rate limit exceeded. Try again later.", Instant.now())
                    );
                    return;
                }
                timestamps.addLast(Instant.now());
            }
        }

        filterChain.doFilter(request, response);
    }

    private boolean shouldLimit(HttpServletRequest request) {
        return HttpMethod.POST.matches(request.getMethod())
                && (request.getRequestURI().startsWith("/api/decision-drafts")
                || request.getRequestURI().startsWith("/api/decision-analyses"));
    }

    private String resolveClientKey(HttpServletRequest request) {
        String forwarded = request.getHeader("X-Forwarded-For");
        if (forwarded != null && !forwarded.isBlank()) {
            return forwarded.split(",")[0].trim();
        }
        return request.getRemoteAddr();
    }
}
