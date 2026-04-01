package com.decisionarena.web;

import com.decisionarena.service.DecisionDraftService;
import com.decisionarena.web.dto.CreateDraftRequest;
import com.decisionarena.web.dto.DraftResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/decision-drafts")
public class DecisionDraftController {

    private final DecisionDraftService decisionDraftService;

    public DecisionDraftController(DecisionDraftService decisionDraftService) {
        this.decisionDraftService = decisionDraftService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public DraftResponse createDraft(@Valid @RequestBody CreateDraftRequest request) {
        return decisionDraftService.createDraft(request.question(), request.locale());
    }

    @GetMapping("/{draftId}")
    public DraftResponse getDraft(@PathVariable String draftId) {
        return decisionDraftService.getDraft(draftId);
    }
}
