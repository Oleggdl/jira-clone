package com.example.jiraclone.controllers.scrum;

import com.example.jiraclone.entities.scrum.MarksScrum;
import com.example.jiraclone.entities.scrum.TaskScrum;
import com.example.jiraclone.entities.scrum.UserScrumProject;
import com.example.jiraclone.exceptions.ResourceNotFoundException;
import com.example.jiraclone.repositories.scrum.MarksScrumRepository;
import com.example.jiraclone.repositories.scrum.TaskScrumRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("jira-clone/scrum")
public class MarksScrumController {

    @Autowired
    TaskScrumRepository taskScrumRepository;

    @Autowired
    MarksScrumRepository marksScrumRepository;

    @GetMapping("/marksScrum")
    public List<MarksScrum> getAllMarksScrum() {
        return marksScrumRepository.findAll();
    }

    @GetMapping("/marksScrum/task/{taskId}")
    public List<MarksScrum> getAllMarksScrumUsers(@PathVariable Long taskId) {

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

    @PostMapping("/marksScrum")
    public MarksScrum createMarksScrum(@RequestBody MarksScrum marksScrum) {
        return marksScrumRepository.save(marksScrum);
    }

    @GetMapping("/marksScrum/{id}")
    public ResponseEntity<MarksScrum> getMarksScrumById(@PathVariable Long id) {

        MarksScrum marksScrum = marksScrumRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("MarksScrum not exist with id:" + id));

        return ResponseEntity.ok(marksScrum);
    }

    @PutMapping("/marksScrum/user/{markId}/{taskId}")
    public ResponseEntity<MarksScrum> putComment(@PathVariable Long markId,
                                                 @PathVariable Long taskId) {

        MarksScrum marksScrum = marksScrumRepository.findById(markId).get();
        TaskScrum taskScrum = taskScrumRepository.findById(taskId).get();

        marksScrum.setTask_scrum_marks(taskScrum);

        MarksScrum updatedMarksScrum = marksScrumRepository.save(marksScrum);

        return ResponseEntity.ok(updatedMarksScrum);
    }

    @PutMapping("/marksScrum/{id}")
    public ResponseEntity<MarksScrum> updateMarksScrum(@PathVariable Long id,
                                                       @RequestBody MarksScrum marksScrumDetails) {

        MarksScrum marksScrum = marksScrumRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("MarksScrum not exist with id:" + id));

        marksScrum.setMark_color(marksScrumDetails.getMark_color());
        marksScrum.setMark_text(marksScrumDetails.getMark_text());

        MarksScrum updateMarksScrum = marksScrumRepository.save(marksScrum);

        return ResponseEntity.ok(updateMarksScrum);
    }

    @DeleteMapping("/marksScrum/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteMarksScrum(@PathVariable Long id) {
        MarksScrum marksScrum = marksScrumRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("MarksScrum not exist with id:" + id));

        marksScrumRepository.delete(marksScrum);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
