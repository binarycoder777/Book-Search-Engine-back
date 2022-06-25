package com.cqut.atao.es.controller;


import com.cqut.atao.es.entity.EsBook;
import com.cqut.atao.es.entity.EsDoc;
import com.cqut.atao.es.mapper.EsBookMapper;
import com.cqut.atao.es.service.EsBookService;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchRequestBuilder;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.index.query.FuzzyQueryBuilder;
import org.elasticsearch.index.query.QueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.elasticsearch.search.fetch.subphase.highlight.HighlightBuilder;
import org.elasticsearch.search.suggest.Suggest;
import org.elasticsearch.search.suggest.SuggestBuilder;
import org.elasticsearch.search.suggest.SuggestBuilders;
import org.elasticsearch.search.suggest.completion.CompletionSuggestion;
import org.elasticsearch.search.suggest.completion.CompletionSuggestionBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.core.*;
import org.springframework.data.elasticsearch.core.mapping.IndexCoordinates;
import org.springframework.data.elasticsearch.core.query.NativeSearchQuery;
import org.springframework.data.elasticsearch.core.query.NativeSearchQueryBuilder;
import org.springframework.data.elasticsearch.core.query.Query;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/book")
@CrossOrigin(origins = "*")
public class EsBookController {

//    @Autowired
//    private EsBookService esBookService;
//
//    @Autowired
//    private EsBookMapper esBookMapper;

    @Autowired
    private ElasticsearchRestTemplate elasticsearchRestTemplate;


    /**
     * 根据关键字，进行分页查询
     * @param keyword
     * @param pageSize
     * @param pageIndex
     * @param order
     * @param async
     * @return
     */
    @GetMapping("/search")
    public Page<EsDoc> searchInfo(@RequestParam(value = "keyword",required = true, defaultValue = "") String keyword,
                                  @RequestParam(value = "pageSize",required = true, defaultValue = "10")Integer pageSize,
                                  @RequestParam(value = "pageIndex",required = true, defaultValue = "1")Integer pageIndex,
                                  @RequestParam(value="order",required=false,defaultValue="new") String order,
                                  @RequestParam(value="async",required=false) boolean async
    ){
        List<EsDoc> list = new ArrayList<>();
        // 构建查询
        FuzzyQueryBuilder matchAllQueryBuilder = QueryBuilders.fuzzyQuery("summary", keyword);
        // 构建高亮
        HighlightBuilder highlightBuilder = new HighlightBuilder( );
        highlightBuilder.preTags("<span style='color: red;'>")
                .postTags("</span>")
                .field("summary");//哪个字段高亮
        // 构建分页
        Pageable pageable= PageRequest.of(pageIndex-1,pageSize);
        // 查询
        NativeSearchQueryBuilder builder=new NativeSearchQueryBuilder();
        NativeSearchQuery query=builder.withQuery(matchAllQueryBuilder)
                .withPageable(pageable)
                .withHighlightBuilder(highlightBuilder)
                .build();
        // 数据解析
        SearchHits<EsDoc> search = elasticsearchRestTemplate.search(query, EsDoc.class);
//        Stream<SearchHit<SerchModel>> searchHitStream = search.get();
        List<SearchHit<EsDoc>> searchHits = search.getSearchHits();
        for (SearchHit<EsDoc> esDocSearchHit: searchHits){
            StringBuilder stringBuilder = new StringBuilder();
            List<String> summary = esDocSearchHit.getHighlightField("summary");
            for (String s: summary){
                stringBuilder.append(s);
            }
            esDocSearchHit.getContent().setSummary(stringBuilder.toString());
            list.add(esDocSearchHit.getContent());
        }
        Page<EsDoc> esDocPage = new PageImpl<EsDoc>(list,pageable,search.getTotalHits());
//        System.out.println(esDocPage.getContent());
        return esDocPage;
    }


    /**
     * 根据关键字前缀进行搜索词推荐
     * @param prefix
     * @return
     */
    @GetMapping("/suggest")
    public List<Map<String,String>> searchPrefix(@RequestParam("prefix") String prefix){
        List<Map<String,String>> data = new ArrayList<>();
        // 设置建议内容来自哪里、取多少条数据
        CompletionSuggestionBuilder suggestionBuilderDistrict = SuggestBuilders.completionSuggestion("title")
                .prefix(prefix).size(10);
        // 构造
        SuggestBuilder suggestBuilder = new SuggestBuilder();
        // 添加
        suggestBuilder.addSuggestion("prefix_suggest", suggestionBuilderDistrict);
        IndexCoordinates indexCoordinates = elasticsearchRestTemplate.getIndexCoordinatesFor(EsDoc.class);
        // 获取响应
        SearchResponse searchResponse = elasticsearchRestTemplate.suggest(suggestBuilder,indexCoordinates);
        Suggest suggest = searchResponse.getSuggest();
        // 解析数据
        Suggest.Suggestion res = suggest.getSuggestion("prefix_suggest");
        for (Object o: res){
            Suggest.Suggestion.Entry entry = (Suggest.Suggestion.Entry)o;
            for (Object option: entry.getOptions()){
                Suggest.Suggestion.Entry.Option s = (Suggest.Suggestion.Entry.Option)option;
                Map<String,String> map = new HashMap<>();
                map.put("value",s.getText().toString());
                data.add(map);
            }
        }
        return data;
    }


    /**
     * 根据搜索前缀，推荐书籍
     * @param prefix
     * @return
     */
    @GetMapping("/suggest/doc")
    public List<EsDoc> suggestDoc(@RequestParam("prefix") String prefix){
        List<EsDoc> list = new ArrayList<>();
        // 构建查询
        FuzzyQueryBuilder matchAllQueryBuilder = QueryBuilders.fuzzyQuery("s_title", prefix);
        // 构建高亮
        HighlightBuilder highlightBuilder = new HighlightBuilder();
        highlightBuilder.preTags("<span style='color: red;'>")
                .postTags("</span>")
                .field("s_title");//哪个字段高亮
        // 构建分页
        Pageable pageable= PageRequest.of(0,6);
        // 查询
        NativeSearchQueryBuilder builder=new NativeSearchQueryBuilder();
        NativeSearchQuery query=builder.withQuery(matchAllQueryBuilder)
                .withPageable(pageable)
                .withHighlightBuilder(highlightBuilder)
                .build();
        // 数据解析
        SearchHits<EsDoc> search = elasticsearchRestTemplate.search(query, EsDoc.class);
//        Stream<SearchHit<SerchModel>> searchHitStream = search.get();
        List<SearchHit<EsDoc>> searchHits = search.getSearchHits();
        for (SearchHit<EsDoc> esDocSearchHit: searchHits){
            StringBuilder stringBuilder = new StringBuilder();
            List<String> summary = esDocSearchHit.getHighlightField("s_title");
            for (String s: summary){
                stringBuilder.append(s);
            }
            esDocSearchHit.getContent().setSummary(stringBuilder.toString());
            list.add(esDocSearchHit.getContent());
        }
        return list;
    }


    /**
     * 根据搜索前缀，推荐资源
     * @param prefix
     * @return
     */
    @GetMapping("/suggest/source")
    public List<EsBook> suggestSource(@RequestParam("prefix") String prefix){
        List<EsBook> list = new ArrayList<>();
        // 构建查询
        FuzzyQueryBuilder matchAllQueryBuilder = QueryBuilders.fuzzyQuery("summary", prefix);
        // 构建高亮
        HighlightBuilder highlightBuilder = new HighlightBuilder();
        highlightBuilder.preTags("<span style='color: red;'>")
                .postTags("</span>")
                .field("summary");//哪个字段高亮
        // 构建分页
        Pageable pageable= PageRequest.of(0,6);
        // 查询
        NativeSearchQueryBuilder builder=new NativeSearchQueryBuilder();
        NativeSearchQuery query=builder.withQuery(matchAllQueryBuilder)
                .withPageable(pageable)
                .withHighlightBuilder(highlightBuilder)
                .build();
        // 数据解析
        SearchHits<EsBook> search = elasticsearchRestTemplate.search(query, EsBook.class);
//        Stream<SearchHit<SerchModel>> searchHitStream = search.get();
        List<SearchHit<EsBook>> searchHits = search.getSearchHits();
        for (SearchHit<EsBook> esDocSearchHit: searchHits){
            StringBuilder stringBuilder = new StringBuilder();
            List<String> summary = esDocSearchHit.getHighlightField("summary");
            for (String s: summary){
                stringBuilder.append(s);
            }
            esDocSearchHit.getContent().setSummary(stringBuilder.toString());
            list.add(esDocSearchHit.getContent());
        }
        System.out.println(list);
        return list;
    }


    /**
     * 根据关键字前缀进行搜索词纠正
     * @param keyword
     * @return
     */
    @GetMapping("/correct")
    public List<String> searchCorrect(@RequestParam("keyword") String keyword){
        return null;
    }







}
