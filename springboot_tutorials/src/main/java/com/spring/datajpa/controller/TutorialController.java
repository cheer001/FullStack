package com.spring.datajpa.controller;

import com.spring.datajpa.model.Tutorial;
import com.spring.datajpa.service.TutorialService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@Api(tags = "控制器-教程列表")
@RequestMapping("/tutorials")
public class TutorialController {
    @Autowired
    private TutorialService tutorialService;

    @ApiOperation("查询所有教程")
    @GetMapping("/getTutorialList")
    public ResponseEntity<List<Tutorial>> getTutorialList(){
        List<Tutorial> list = tutorialService.getTutorialList();
        return ResponseEntity.ok().body(list);
    }
    @ApiOperation("根据发布状态查询教程")
    @GetMapping("/getByPublished")
    public ResponseEntity<List<Tutorial>> getByPublished(@RequestParam(required = false) boolean published){
        List<Tutorial> byPublishedList = tutorialService.findByPublished(published);
        return ResponseEntity.ok().body(byPublishedList);
    }
    @ApiOperation("根据标题查询教程")
    @GetMapping("/getByTitle")
    public ResponseEntity<List<Tutorial>> getByTitle(@RequestParam(required = false)String title){
        List<Tutorial> byTitleList = tutorialService.findByTitleContaining(title);
        return ResponseEntity.ok().body(byTitleList);
    }

}
