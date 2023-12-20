package com.test.ch1.mapper.postgres;

import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper(value = "postgresTest")
public interface PostgresTestMapper {

    int postgresCount();
}
