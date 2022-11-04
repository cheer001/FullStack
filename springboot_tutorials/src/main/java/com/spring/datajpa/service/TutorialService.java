package com.spring.datajpa.service;

import com.spring.datajpa.model.Tutorial;
import com.spring.datajpa.repository.TutorialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TutorialService {
    @Autowired
    private TutorialRepository tutorialRepository;

    public List<Tutorial> getTutorialList(){
        return tutorialRepository.findAll();
    }

    public List<Tutorial> findByPublished(boolean published){
        return tutorialRepository.findByPublished(published);
    }

    public List<Tutorial> findByTitleContaining(String title){
        return tutorialRepository.findByTitleContaining(title);
    }
}
