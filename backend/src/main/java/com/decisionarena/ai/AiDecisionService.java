package com.decisionarena.ai;

import com.decisionarena.domain.DecisionAnalysisRequest;
import com.decisionarena.domain.DecisionAnalysisResult;
import com.decisionarena.domain.DecisionFrame;

public interface AiDecisionService {
    DecisionFrame proposeDecisionFrame(String question);

    DecisionAnalysisResult analyzeDecision(DecisionAnalysisRequest request);
}
