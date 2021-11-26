package com.cqut.atao.es.service.impl;

import com.cqut.atao.es.entity.Book;
import com.cqut.atao.es.mapper.BookMapper;
import com.cqut.atao.es.service.BookService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author atao
 * @since 2021-11-25
 */
@Service
public class BookServiceImpl extends ServiceImpl<BookMapper, Book> implements BookService {

}
