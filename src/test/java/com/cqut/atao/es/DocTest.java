//package com.cqut.atao.es;
//
//
//import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
//import com.cqut.atao.es.entity.Book;
//import com.cqut.atao.es.entity.Doc;
//import com.cqut.atao.es.entity.EsBook;
//import com.cqut.atao.es.entity.EsDoc;
//import com.cqut.atao.es.mapper.BookMapper;
//import com.cqut.atao.es.mapper.DocMapper;
//import com.cqut.atao.es.mapper.EsBookMapper;
//import com.cqut.atao.es.mapper.EsDocMapper;
//import org.elasticsearch.action.search.SearchResponse;
//import org.elasticsearch.index.query.FuzzyQueryBuilder;
//import org.elasticsearch.index.query.QueryBuilders;
//import org.elasticsearch.search.fetch.subphase.highlight.HighlightBuilder;
//import org.elasticsearch.search.suggest.Suggest;
//import org.elasticsearch.search.suggest.SuggestBuilder;
//import org.elasticsearch.search.suggest.SuggestBuilders;
//import org.elasticsearch.search.suggest.completion.CompletionSuggestionBuilder;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.PageImpl;
//import org.springframework.data.domain.PageRequest;
//import org.springframework.data.domain.Pageable;
//import org.springframework.data.elasticsearch.core.ElasticsearchRestTemplate;
//import org.springframework.data.elasticsearch.core.SearchHit;
//import org.springframework.data.elasticsearch.core.SearchHits;
//import org.springframework.data.elasticsearch.core.mapping.IndexCoordinates;
//import org.springframework.data.elasticsearch.core.query.NativeSearchQuery;
//import org.springframework.data.elasticsearch.core.query.NativeSearchQueryBuilder;
//import org.springframework.test.context.junit4.SpringRunner;
//
//import java.io.IOException;
//import java.util.ArrayList;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//@SpringBootTest
//@RunWith(SpringRunner.class)
//public class DocTest {
//
//    @Autowired
//    private BookMapper bookMapper;
//
//    @Autowired
//    private DocMapper docMapper;
//
//    @Autowired
//    private EsDocMapper esDocMapper;
//
//    @Autowired
//    private EsBookMapper esBookMapper;
//
//    @Autowired
//    private ElasticsearchRestTemplate elasticsearchRestTemplate;
//
//    @Test
//    public void addBook() throws IOException {
//        List<Doc> docs = docMapper.selectList(null).subList(0,1000);
//        System.out.println("ok");
////        System.out.println(bookMapper.selectById(28523));
//        List<EsDoc> esNews = new ArrayList<>();
//        for (Doc doc: docs){
//            EsDoc esDoc = doc.getEsDoc();
//            esNews.add(esDoc);
//        }
//        esDocMapper.saveAll(esNews);
//    }
//
//    @Test
//    public void searchPrefix(){
//        String prefix = "spring";
//        CompletionSuggestionBuilder suggestionBuilderDistrict = SuggestBuilders.completionSuggestion("title")
//                .prefix(prefix).size(10);
//        SuggestBuilder suggestBuilder = new SuggestBuilder();
//        suggestBuilder.addSuggestion("prefix_suggest", suggestionBuilderDistrict);
//        IndexCoordinates indexCoordinates = elasticsearchRestTemplate.getIndexCoordinatesFor(EsBook.class);
//        SearchResponse searchResponse = elasticsearchRestTemplate.suggest(suggestBuilder,indexCoordinates);
//        Suggest suggest = searchResponse.getSuggest();
//        Suggest.Suggestion res = suggest.getSuggestion("prefix_suggest");
//        for (Object o: res){
//            Suggest.Suggestion.Entry entry = (Suggest.Suggestion.Entry)o;
//            for (Object option: entry.getOptions()){
//                Suggest.Suggestion.Entry.Option s = (Suggest.Suggestion.Entry.Option)option;
//                System.out.println(s.getText());
//            }
//        }
//    }
//
//
//    @Test
//    public void getPageInfo(){
//        Integer pageIndex = 0;
//        Integer pageSize = 10;
//        String keyword = "java";
//        // 构建查询
//        FuzzyQueryBuilder matchAllQueryBuilder = QueryBuilders.fuzzyQuery("summary", keyword);
//        // 构建高亮
//        HighlightBuilder highlightBuilder = new HighlightBuilder();
//        highlightBuilder.preTags("<span color:'red'>")
//                .postTags("</span>")
//                .field("summary");//哪个字段高亮
//        // 构建分页
//        Pageable pageable= PageRequest.of(pageIndex,pageSize);
//        // 查询
//        NativeSearchQueryBuilder builder=new NativeSearchQueryBuilder();
//        NativeSearchQuery query=builder.withQuery(matchAllQueryBuilder)
//                .withPageable(pageable)
//                .withHighlightBuilder(highlightBuilder)
//                .build();
//        // 数据解析
//        SearchHits<EsBook> search = elasticsearchRestTemplate.search(query, EsBook.class);
////        Stream<SearchHit<SerchModel>> searchHitStream = search.get();
//        List<SearchHit<EsBook>> searchHits = search.getSearchHits();
//        for (SearchHit<EsBook> esBookSearchHit: searchHits){
//            StringBuilder stringBuilder = new StringBuilder();
//            List<String> summary = esBookSearchHit.getHighlightField("summary");
//            for (String s: summary){
//               stringBuilder.append(s);
//            }
//            esBookSearchHit.getContent().setSummary(stringBuilder.toString());
//        }
//        List<EsBook> list = new ArrayList<>();
//        for (SearchHit<EsBook> esBookSearchHit: searchHits){
//            System.out.println();
//            System.out.println();
//            System.out.println(esBookSearchHit.getContent());
//            list.add(esBookSearchHit.getContent());
//            System.out.println();
//            System.out.println();
//        }
////        List<EsBook> esBookList = wrapperData(searchResponse);
//        Page<EsBook> esCustomerPage = new PageImpl<EsBook>(list,pageable,search.getTotalHits());
//        System.out.println(esCustomerPage.getSize()+" "+esCustomerPage.getNumber()+" "+esCustomerPage.getTotalElements());
//        // 组装分页对象
////        Page<EsBook> esBookPage = new PageImpl<>(userVoList,pageRequest,searchHits.getTotalHits());
////        System.out.println( "========="+pageable.getOffset()+"========="+pageable.toString()+"======="+pageable.);
//    }
//
//    @Test
//    public void getPageInfo2(){
//        Integer pageIndex = 0;
//        Integer pageSize = 10;
//        String keyword = "java";
//        FuzzyQueryBuilder matchAllQueryBuilder = QueryBuilders.fuzzyQuery("summary", keyword);
//        IndexCoordinates indexCoordinates = elasticsearchRestTemplate.getIndexCoordinatesFor(EsBook.class);
//        // 构建高亮
//        HighlightBuilder highlightBuilder = new HighlightBuilder();
//        highlightBuilder.preTags("<span color:'red'>")
//                .postTags("</span>")
//                .field("summary");
//        // 查询
//        NativeSearchQueryBuilder searchQuery = new NativeSearchQueryBuilder();
//        searchQuery.withQuery(matchAllQueryBuilder)
//                .withHighlightBuilder(highlightBuilder)
//                .build();
////        ElasticsearchOperations operations = elasticsearchRestTemplate;
////        elasticsearchRestTemplate.
////        operations.queryForPage(searchQuery,EsBook.class,indexCoordinates);
//    }
//
//
//    @Test
//    public void suggestDoc(){
//        int pageIndex = 1, pageSize = 10;
//        String keyword = "java";
//        List<EsDoc> list = new ArrayList<>();
//        // 构建查询
//        FuzzyQueryBuilder matchAllQueryBuilder = QueryBuilders.fuzzyQuery("s_title", keyword);
//        // 构建高亮
//        HighlightBuilder highlightBuilder = new HighlightBuilder();
//        highlightBuilder.preTags("<span style='color: red;'>")
//                .postTags("</span>")
//                .field("s_title");//哪个字段高亮
//        // 构建分页
//        Pageable pageable= PageRequest.of(pageIndex-1,pageSize);
//        // 查询
//        NativeSearchQueryBuilder builder=new NativeSearchQueryBuilder();
//        NativeSearchQuery query=builder.withQuery(matchAllQueryBuilder)
//                .withPageable(pageable)
//                .withHighlightBuilder(highlightBuilder)
//                .build();
//        // 数据解析
//        SearchHits<EsDoc> search = elasticsearchRestTemplate.search(query, EsDoc.class);
////        Stream<SearchHit<SerchModel>> searchHitStream = search.get();
//        List<SearchHit<EsDoc>> searchHits = search.getSearchHits();
//        for (SearchHit<EsDoc> esDocSearchHit: searchHits){
//            StringBuilder stringBuilder = new StringBuilder();
//            List<String> summary = esDocSearchHit.getHighlightField("s_title");
//            for (String s: summary){
//                stringBuilder.append(s);
//            }
//            esDocSearchHit.getContent().setSummary(stringBuilder.toString());
//            list.add(esDocSearchHit.getContent());
//        }
//        Page<EsDoc> esDocPage = new PageImpl<EsDoc>(list,pageable,search.getTotalHits());
//        System.out.println(esDocPage.getContent());
//        }
//
//}
