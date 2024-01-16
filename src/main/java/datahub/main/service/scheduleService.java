package datahub.main.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.time.LocalDateTime;

@Component
public class scheduleService {

    private final Logger log = LoggerFactory.getLogger(this.getClass());
    private int count = 0;

    @PostConstruct
    private void init() {
        helloSchedule();
    }

    @Scheduled(cron = "0 0/1 * * * ?")
    public void helloSchedule() {
        LocalDateTime date = LocalDateTime.now();
        log.info("안녕하세요 {} , {}", count + "번째",date);
        count++;
    }
}
