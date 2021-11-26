package com.cqut.atao.es;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.cqut.atao.es.mapper.BookMapper;
import com.cqut.atao.es.mapper.EsBookMapper;
import com.cqut.atao.es.entity.Book;
import com.cqut.atao.es.entity.EsBook;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;


import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@SpringBootTest
@RunWith(SpringRunner.class)
public class BookTest {

    @Autowired
    private BookMapper bookMapper;

    @Autowired
    private EsBookMapper esBookMapper;

    @Test
    public void addBook() throws IOException {

        QueryWrapper<Book> bookQueryWrapper = new QueryWrapper<>();
        bookQueryWrapper.like("title", "spring");
        List<Book> books = bookMapper.selectList(bookQueryWrapper);
//        System.out.println(bookMapper.selectById(28523));
        List<EsBook> esNews = new ArrayList<>();

        for (Book book: books){
            EsBook news = book.getEsBook();
            esNews.add(news);
        }
        esBookMapper.saveAll(esNews);
    }
}
