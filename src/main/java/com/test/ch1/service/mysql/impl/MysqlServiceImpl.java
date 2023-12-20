package com.test.ch1.service.mysql.impl;

import com.test.ch1.mapper.mysql.MysqlTestMapper;
import com.test.ch1.service.mysql.MysqlService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class MysqlServiceImpl implements MysqlService {

    @Resource(name = "mysqlTest")
    private MysqlTestMapper mysqlTestMapper;

    @Override
    public int mysqlCount() {
        return mysqlTestMapper.mysqlCount();
    }
}
