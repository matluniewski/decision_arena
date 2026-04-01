package com.decisionarena.web;

import com.decisionarena.service.DecisionAnalysisService;
import com.decisionarena.web.dto.AnalysisResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/results")
public class ResultController {

    private final DecisionAnalysisService decisionAnalysisService;

    public ResultController(DecisionAnalysisService decisionAnalysisService) {
        this.decisionAnalysisService = decisionAnalysisService;
    }

    @GetMapping("/{shareSlug}")
    public AnalysisResponse getSharedResult(@PathVariable String shareSlug) {
        return decisionAnalysisService.getSharedResult(shareSlug);
    }
}
