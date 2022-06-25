package com.cqut.atao.es.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;


@Document(indexName = "e_book", type = "_doc", shards = 3, replicas = 1)
@ToString
@Data
@AllArgsConstructor
@NoArgsConstructor
public class EsDoc {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    /**
     * 标题
     */
//    @Field(type = FieldType.Text, analyzer = "ik_max_world")
    @Field(type = FieldType.Object)
    private String title;

    @Field(type = FieldType.Text, index = true)
    private String s_title;

    /**
     * 作者
     */
    @Field(type = FieldType.Text, index = true)
    private String author;

    /**
     * 文本
     */
    @Field(type = FieldType.Text, index = true)
    private String summary;

    /**
     * 创建时间
     */
    @Field(type = FieldType.Text, index = true)
    private String createTime;

    /**
     * 图片链接
     */
    @Field(type = FieldType.Text, index = false)
    private String pic;

    /**
     * 出版社
     */
    @Field(type = FieldType.Text, index = false)
    private String site;

    /**
     * 网页链接
     */
    @Field(type = FieldType.Text)
    private String url;
}
