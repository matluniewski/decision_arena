package com.decisionarena.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SharedResultRepository extends JpaRepository<SharedResultEntity, String> {
    Optional<SharedResultEntity> findByShareSlug(String shareSlug);
}
