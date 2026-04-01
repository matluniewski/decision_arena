package com.decisionarena.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

public interface DecisionDraftRepository extends JpaRepository<DecisionDraftEntity, String> {
}
