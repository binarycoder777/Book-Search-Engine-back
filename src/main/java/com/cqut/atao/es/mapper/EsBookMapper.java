package com.cqut.atao.es.mapper;


import com.cqut.atao.es.entity.EsBook;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author atao
 * @since 2021-11-25
 */
@Repository
public interface EsBookMapper extends ElasticsearchRepository<EsBook,Long> {

}
