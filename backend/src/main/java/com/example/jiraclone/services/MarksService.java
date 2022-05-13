package com.example.jiraclone.services;

import com.example.jiraclone.entities.scrum.MarksScrum;
import com.example.jiraclone.entities.scrum.TaskScrum;
import com.example.jiraclone.exceptions.ResourceNotFoundException;
import com.example.jiraclone.repositories.scrum.MarksScrumRepository;
import com.example.jiraclone.repositories.scrum.TaskScrumRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class MarksService {

    @Autowired
    TaskScrumRepository taskScrumRepository;

    @Autowired
    MarksScrumRepository marksScrumRepository;

    public List<MarksScrum> getAllMarksScrum() {
        return marksScrumRepository.findAll();
    }

    public List<MarksScrum> getAllMarksScrumUsers(Long taskId) {
        TaskScrum taskScrum = taskScrumRepository.findById(taskId).get();
        List<MarksScrum> marksScrums = marksScrumRepository.findAll();
        ArrayList<MarksScrum> marksScrumsArray = new ArrayList<>();
        for (int i = 0; i <= marksScrums.size() - 1; i++) {
            if (marksScrums.get(i).getTask_scrum_marks() == taskScrum) {
                marksScrumsArray.add(marksScrums.get(i));
            }
        }
        return marksScrumsArray;
    }

    public MarksScrum createMarksScrum(MarksScrum marksScrum) {
        return marksScrumRepository.save(marksScrum);
    }

    public ResponseEntity<MarksScrum> getMarksScrumById(Long id) {
        MarksScrum marksScrum = marksScrumRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("MarksScrum not exist with id:" + id));
        return ResponseEntity.ok(marksScrum);
    }

    public ResponseEntity<MarksScrum> putComment(Long markId, Long taskId) {
        MarksScrum marksScrum = marksScrumRepository.findById(markId).get();
        TaskScrum taskScrum = taskScrumRepository.findById(taskId).get();
        marksScrum.setTask_scrum_marks(taskScrum);
        MarksScrum updatedMarksScrum = marksScrumRepository.save(marksScrum);
        return ResponseEntity.ok(updatedMarksScrum);
    }

    public ResponseEntity<MarksScrum> updateMarksScrum(Long id, MarksScrum marksScrumDetails) {
        MarksScrum marksScrum = marksScrumRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("MarksScrum not exist with id:" + id));
        marksScrum.setMark_color(marksScrumDetails.getMark_color());
        marksScrum.setMark_text(marksScrumDetails.getMark_text());
        MarksScrum updateMarksScrum = marksScrumRepository.save(marksScrum);
        return ResponseEntity.ok(updateMarksScrum);
    }

    public ResponseEntity<Map<String, Boolean>> deleteMarksScrum(Long id) {
        MarksScrum marksScrum = marksScrumRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("MarksScrum not exist with id:" + id));
        marksScrumRepository.delete(marksScrum);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
