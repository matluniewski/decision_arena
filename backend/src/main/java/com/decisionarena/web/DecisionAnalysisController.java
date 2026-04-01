package com.decisionarena.web;

import com.decisionarena.service.DecisionAnalysisService;
import com.decisionarena.web.dto.AnalysisResponse;
import com.decisionarena.web.dto.CreateAnalysisRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/decision-analyses")
public class DecisionAnalysisController {

    private final DecisionAnalysisService decisionAnalysisService;

    public DecisionAnalysisController(DecisionAnalysisService decisionAnalysisService) {
        this.decisionAnalysisService = decisionAnalysisService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public AnalysisResponse analyze(@Valid @RequestBody CreateAnalysisRequest request) {
        return decisionAnalysisService.analyze(request);
    }
}
