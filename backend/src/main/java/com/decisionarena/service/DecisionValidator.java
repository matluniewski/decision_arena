package com.decisionarena.service;

import com.decisionarena.config.DecisionProperties;
import com.decisionarena.domain.CriterionInput;
import com.decisionarena.domain.DecisionFrame;
import com.decisionarena.domain.DecisionOptionInput;
import com.decisionarena.support.ValidationException;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.List;
import java.util.Locale;
import java.util.Set;

@Component
public class DecisionValidator {

    private final DecisionProperties decisionProperties;

    public DecisionValidator(DecisionProperties decisionProperties) {
        this.decisionProperties = decisionProperties;
    }

    public String sanitizeQuestion(String question) {
        String sanitized = question == null ? "" : question.trim().replaceAll("\\s+", " ");
        if (sanitized.isBlank()) {
            throw new ValidationException("Question is required.");
        }
        if (sanitized.length() > maxQuestionLength()) {
            throw new ValidationException("Question exceeds the maximum allowed length.");
        }
        return sanitized;
    }

    public void validateFrame(DecisionFrame frame) {
        validateOptions(frame.proposedOptions());
        validateCriteria(frame.proposedCriteria());
    }

    public void validateOptions(List<DecisionOptionInput> options) {
        if (options.size() < minOptions() || options.size() > maxOptions()) {
            throw new ValidationException("Option count is outside the supported range.");
        }

        Set<String> labels = new HashSet<>();
        for (DecisionOptionInput option : options) {
            if (option.label() == null || option.label().isBlank()) {
                throw new ValidationException("Option label cannot be blank.");
            }
            if (!labels.add(option.label().trim().toLowerCase(Locale.ROOT))) {
                throw new ValidationException("Option labels must be unique.");
            }
        }
    }

    public void validateCriteria(List<CriterionInput> criteria) {
        if (criteria.size() < minCriteria() || criteria.size() > maxCriteria()) {
            throw new ValidationException("Criteria count is outside the supported range.");
        }

        Set<String> labels = new HashSet<>();
        for (CriterionInput criterion : criteria) {
            if (criterion.label() == null || criterion.label().isBlank()) {
                throw new ValidationException("Criterion label cannot be blank.");
            }
            if (criterion.weight() < minWeight() || criterion.weight() > maxWeight()) {
                throw new ValidationException("Criterion weight is outside the supported range.");
            }
            if (!labels.add(criterion.label().trim().toLowerCase(Locale.ROOT))) {
                throw new ValidationException("Criteria labels must be unique.");
            }
        }
    }

    private int maxQuestionLength() {
        return decisionProperties.maxQuestionLength() > 0 ? decisionProperties.maxQuestionLength() : 280;
    }

    private int minOptions() {
        return decisionProperties.minOptions() > 0 ? decisionProperties.minOptions() : 2;
    }

    private int maxOptions() {
        return decisionProperties.maxOptions() > 0 ? decisionProperties.maxOptions() : 4;
    }

    private int minCriteria() {
        return decisionProperties.minCriteria() > 0 ? decisionProperties.minCriteria() : 4;
    }

    private int maxCriteria() {
        return decisionProperties.maxCriteria() > 0 ? decisionProperties.maxCriteria() : 6;
    }

    private int minWeight() {
        return decisionProperties.minWeight() > 0 ? decisionProperties.minWeight() : 1;
    }

    private int maxWeight() {
        return decisionProperties.maxWeight() > 0 ? decisionProperties.maxWeight() : 5;
    }
}
