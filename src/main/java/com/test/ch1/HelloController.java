package com.test.ch1;

import com.test.ch1.service.mysql.MysqlService;
import com.test.ch1.service.postgres.PostgresService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.inject.Inject;

@Controller
public class HelloController {

    Logger logger = LoggerFactory.getLogger(this.getClass());

    @Inject
    private MysqlService mysqlService;
    @Inject
    private PostgresService postgresService;


    @RequestMapping(value = "/index.do", method = RequestMethod.GET)
    public String index() {

        logger.info("mysql DB : {}",mysqlService.mysqlCount());
        logger.info("postgres DB : {}",postgresService.postgresCount());

        return "index";
    }


    @RequestMapping(value = "/connect.do", method = RequestMethod.GET)
    public String connect() {
        logger.info("mysql DB : {}",mysqlService.mysqlCount());
        logger.info("postgres DB : {}",postgresService.postgresCount());

        return "count";
    }
}
