package com.cqut.atao.es.mapper;

import com.cqut.atao.es.entity.EsDoc;
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
public interface EsDocMapper extends ElasticsearchRepository<EsDoc,String> {

}