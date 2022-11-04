package com.spring.datajpa.model;

import javax.persistence.*;

@Entity
@Table(name = "tutorials")
public class Tutorial {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "published")
    private Boolean published;

    public Tutorial(){}

    public Tutorial(Long id,String title,String description,Boolean published){
        super();
        this.id = id;
        this.title = title;
        this.description = description;
        this.published = published;
    }

    public Long getId(){
        return id;
    }
    public void setId(Long id){
        this.id = id;
    }
    public String getTitle(){
        return title;
    }
    public void setTitle(String title){
        this.title = title;
    }
    public String getDescription(){
        return description;
    }
    public void setDescription(String description){
        this.description = description;
    }
    public Boolean getPublished(){
        return published;
    }
    public void setPublished(Boolean published){
        this.published = published;
    }





}
