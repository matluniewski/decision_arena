package com.decisionarena.service;

import org.springframework.stereotype.Service;

import java.security.SecureRandom;

@Service
public class SlugService {

    private static final String ALPHABET = "23456789abcdefghjkmnpqrstuvwxyz";
    private static final int LENGTH = 12;

    private final SecureRandom secureRandom = new SecureRandom();

    public String nextSlug() {
        StringBuilder builder = new StringBuilder(LENGTH);
        for (int index = 0; index < LENGTH; index++) {
            builder.append(ALPHABET.charAt(secureRandom.nextInt(ALPHABET.length())));
        }
        return builder.toString();
    }
}
