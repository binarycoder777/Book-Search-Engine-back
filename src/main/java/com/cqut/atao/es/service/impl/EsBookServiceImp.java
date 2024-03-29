package com.cqut.atao.es.service.impl;


import com.cqut.atao.es.service.EsBookService;
import org.apache.http.HttpHost;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestClientBuilder;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.common.text.Text;
import org.elasticsearch.common.unit.TimeValue;
import org.elasticsearch.index.query.*;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.SearchHits;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.elasticsearch.search.fetch.subphase.highlight.HighlightBuilder;
import org.elasticsearch.search.fetch.subphase.highlight.HighlightField;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@Service
public class EsBookServiceImp implements EsBookService {

//    @Autowired
//    private RestHighLevelClient restHighLevelClient;

    // 3、 在2的基础上进行高亮查询
    public List<Map<String, Object>> highlightSearch(String keyword, Integer pageIndex, Integer pageSize) throws IOException {
        RestClientBuilder builder = RestClient.builder(new HttpHost("42.193.47.213", 9200));
        RestHighLevelClient restHighLevelClient = new RestHighLevelClient(builder);

        SearchRequest searchRequest = new SearchRequest("book");
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
        // 精确查询，添加查询条件
//        TermQueryBuilder termQueryBuilder = QueryBuilders.termQuery("title", keyword);
        FuzzyQueryBuilder matchAllQueryBuilder = QueryBuilders.fuzzyQuery("summary", keyword);

        searchSourceBuilder.timeout(new TimeValue(60, TimeUnit.SECONDS));
//        searchSourceBuilder.query(termQueryBuilder);
//         分页
        searchSourceBuilder.query(matchAllQueryBuilder);
        searchSourceBuilder.from(pageIndex);
        searchSourceBuilder.size(pageSize);
        // 高亮 =========
        HighlightBuilder highlightBuilder = new HighlightBuilder();
        highlightBuilder.field("summary");
        highlightBuilder.preTags("<span style='color:red'>");
        highlightBuilder.postTags("</span>");
        searchSourceBuilder.highlighter(highlightBuilder);
        // 执行查询
        searchRequest.source(searchSourceBuilder);
        SearchResponse searchResponse = restHighLevelClient.search(searchRequest, RequestOptions.DEFAULT);
        // 解析结果 ==========
        SearchHits hits = searchResponse.getHits();
        List<Map<String, Object>> results = new ArrayList<>();
        for (SearchHit documentFields : hits.getHits()) {
            // 使用新的字段值（高亮），覆盖旧的字段值
            Map<String, Object> sourceAsMap = documentFields.getSourceAsMap();
            // 高亮字段
            Map<String, HighlightField> highlightFields = documentFields.getHighlightFields();
            HighlightField name = highlightFields.get("summary");
            // 替换
            if (name != null){
                Text[] fragments = name.fragments();
                StringBuilder new_name = new StringBuilder();
                for (Text text : fragments) {
                    new_name.append(text);
                }
                sourceAsMap.put("summary",new_name.toString());
            }
            results.add(sourceAsMap);
            System.out.println(sourceAsMap);
        }
        return results;
    }
}
