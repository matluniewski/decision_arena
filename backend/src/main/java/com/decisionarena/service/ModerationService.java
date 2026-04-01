package com.decisionarena.service;

import com.decisionarena.support.SensitiveTopicException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Locale;

@Service
public class ModerationService {

    private static final List<String> SENSITIVE_KEYWORDS = List.of(
            "suicide", "self-harm", "kill myself", "depression medication",
            "diagnosis", "cancer", "pregnant", "abortion",
            "legal advice", "lawsuit", "attorney", "lawyer",
            "przemoc", "samob", "depresj", "diagnoz", "rak", "ciaza", "aborcja", "prawnik", "pozew"
    );

    public void assertAllowed(String question) {
        String lower = question.toLowerCase(Locale.ROOT);
        boolean blocked = SENSITIVE_KEYWORDS.stream().anyMatch(lower::contains);
        if (blocked) {
            throw new SensitiveTopicException(
                    "This question is outside the MVP scope. Use specialist help for health, legal, or crisis topics."
            );
        }
    }
}
