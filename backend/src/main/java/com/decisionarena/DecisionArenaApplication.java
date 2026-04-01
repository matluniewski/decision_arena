package com.decisionarena;

import com.decisionarena.config.AiProperties;
import com.decisionarena.config.CorsProperties;
import com.decisionarena.config.DecisionProperties;
import com.decisionarena.config.RateLimitProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties({
        AiProperties.class,
        CorsProperties.class,
        DecisionProperties.class,
        RateLimitProperties.class
})
public class DecisionArenaApplication {

    public static void main(String[] args) {
        SpringApplication.run(DecisionArenaApplication.class, args);
    }
}
