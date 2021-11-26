package com.cqut.atao.es.entity;

import java.math.BigDecimal;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import java.io.Serializable;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

/**
 * <p>
 * 
 * </p>
 *
 * @author atao
 * @since 2021-11-25
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName("tb_book")
public class Book implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    /**
     * 标题
     */
    private String title;

    /**
     * 作者
     */
    private String author;

    /**
     * 时间
     */
    private String createTime;

    /**
     * 文本
     */
    private String summary;

    /**
     * 文本摘要（离线）
     */
    private String summaryOffline;

    /**
     * 网页链接
     */
    private String url;

    /**
     * 该网页所属站点
     */
    private String site;

    /**
     * PageRank值
     */
    private BigDecimal pageRank;

    public EsBook getEsBook(){
        EsBook esBook = new EsBook();
        esBook.setTitle(this.title);
        esBook.setSummary(this.summary);
        esBook.setAuthor(this.author);
        esBook.setUrl(this.url);
        return esBook;
    }
}
