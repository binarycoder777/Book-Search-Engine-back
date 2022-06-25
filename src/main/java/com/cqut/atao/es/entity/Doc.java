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
 * @since 2021-12-05
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName("tb_doc")
public class Doc implements Serializable {

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
    private String pic;

    /**
     * 网页链接
     */
    private String url;

    /**
     * 该网页所属站点
     */
    private String site;

//    private String createTime;

    /**
     * PageRank值
     */
    private BigDecimal pageRank;


    public EsDoc getEsDoc(){
        EsDoc esDoc = new EsDoc();
        esDoc.setAuthor(this.author);
        esDoc.setTitle(this.title);
        esDoc.setS_title(this.title);
        esDoc.setCreateTime(this.createTime);
        esDoc.setId(String.valueOf(this.id));
        esDoc.setPic(this.pic);
        esDoc.setSite(this.site);
        esDoc.setSummary(this.summary);
        esDoc.setUrl(this.url);
        return esDoc;
    }

}
