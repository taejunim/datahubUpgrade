package com.test.ch1.service.postgres.impl;

import com.test.ch1.mapper.postgres.PostgresTestMapper;
import com.test.ch1.service.postgres.PostgresService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class postgresServiceImpl implements PostgresService {

    @Resource(name = "postgresTest")
    private PostgresTestMapper postgresTestMapper;

    @Override
    public int postgresCount() {
        return postgresTestMapper.postgresCount();
    }
}
