package com.cqut.atao.es.controller;


import com.cqut.atao.es.entity.EsBook;
import com.cqut.atao.es.mapper.EsBookMapper;
import com.cqut.atao.es.service.EsBookService;
import org.elasticsearch.action.search.SearchRequestBuilder;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.search.suggest.Suggest;
import org.elasticsearch.search.suggest.SuggestBuilder;
import org.elasticsearch.search.suggest.SuggestBuilders;
import org.elasticsearch.search.suggest.completion.CompletionSuggestion;
import org.elasticsearch.search.suggest.completion.CompletionSuggestionBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.ElasticsearchRestTemplate;
import org.springframework.data.elasticsearch.core.ElasticsearchTemplate;
import org.springframework.data.elasticsearch.core.mapping.IndexCoordinates;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/book")
@CrossOrigin(origins = "*")
public class EsBookController {


    @Autowired
    private EsBookService esBookService;

    @Autowired
    private ElasticsearchRestTemplate elasticsearchRestTemplate;

    @Autowired
    private ElasticsearchOperations elasticsearchOperations;

    @GetMapping
    public ModelAndView toIndex(){
        return new ModelAndView("list");
    }


    @GetMapping("/main")
    public ModelAndView toMain(){
        return new ModelAndView("news");
    }

    @ResponseBody
    @GetMapping("/fix")
    public List<String> listSuggestCompletion(String prefix) {
        // 使用suggest进行标题联想
        CompletionSuggestionBuilder suggest = SuggestBuilders.completionSuggestion("title")
                // 关键字（参数传此）
                .prefix(prefix)
                // 重复过滤
                .skipDuplicates(true)
                // 匹配数量
                .size(10);
        SuggestBuilder suggestBuilder = new SuggestBuilder();
        suggestBuilder.addSuggestion("my-suggest",suggest);

        IndexCoordinates indexCoordinates = elasticsearchOperations.getIndexCoordinatesFor(EsBook.class);

        // 查询
        SearchResponse goodsNameSuggestResp = elasticsearchRestTemplate.suggest(suggestBuilder, indexCoordinates);
        Suggest.Suggestion<? extends Suggest.Suggestion.Entry<? extends Suggest.Suggestion.Entry.Option>> goodsNameSuggest = goodsNameSuggestResp
                .getSuggest().getSuggestion("my-suggest");
        // 处理返回
        List<String> suggests = goodsNameSuggest.getEntries().stream().map(x -> x.getOptions().stream().map(y->y.getText().toString()).collect(Collectors.toList())).findFirst().get();
        // 输出内容
//        for (String s : suggests) {
//            System.out.println("suggest = " + s);
//        }
        return suggests;
    }


    @ResponseBody
    @GetMapping("/hight")
    public ModelAndView search(String keyword, ModelMap model) throws IOException {
        List<Map<String, Object>> res = esBookService.highlightSearch(keyword, 0, 10);
        model.addAttribute("res",res);
//        System.out.println(res.get(0));
        return new ModelAndView("index",model);
    }





}
