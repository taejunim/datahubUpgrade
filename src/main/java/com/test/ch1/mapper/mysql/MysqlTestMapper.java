package com.test.ch1.mapper.mysql;

import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper(value = "mysqlTest")
public interface MysqlTestMapper {

    int mysqlCount();
}
