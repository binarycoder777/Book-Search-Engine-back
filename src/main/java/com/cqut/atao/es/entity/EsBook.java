package com.cqut.atao.es.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;


@Document(indexName = "book", type = "_doc", shards = 3, replicas = 1)
@ToString
@Data
@AllArgsConstructor
@NoArgsConstructor
public class EsBook {

    private static final long serialVersionUID = 1L;

    @Id
    private Long id;

    /**
     * 标题
     */
//    @Field(type = FieldType.Text, analyzer = "ik_max_world")
    @Field(type = FieldType.Object)
    private String title;

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
     * 网页链接
     */
    @Field(type = FieldType.Text)
    private String url;
}
