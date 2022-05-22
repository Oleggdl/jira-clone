package com.example.jiraclone.controllers.scrum;

import com.example.jiraclone.entities.scrum.MarksScrum;
import com.example.jiraclone.services.MarksService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("TaskManager/scrum")
public class MarksScrumController {

    @Autowired
    private MarksService marksService;

    @GetMapping("/marksScrum")
    public List<MarksScrum> getAllMarksScrum() {
        return marksService.getAllMarksScrum();
    }

    @GetMapping("/marksScrum/task/{taskId}")
    public List<MarksScrum> getAllMarksScrumUsers(@PathVariable Long taskId) {
        return marksService.getAllMarksScrumUsers(taskId);
    }

    @PostMapping("/marksScrum")
    public MarksScrum createMarksScrum(@RequestBody MarksScrum marksScrum) {
        return marksService.createMarksScrum(marksScrum);
    }

    @GetMapping("/marksScrum/{id}")
    public ResponseEntity<MarksScrum> getMarksScrumById(@PathVariable Long id) {
        return marksService.getMarksScrumById(id);
    }

    @PutMapping("/marksScrum/tasks/{markId}/{taskId}")
    public ResponseEntity<MarksScrum> putComment(@PathVariable Long markId,
                                                 @PathVariable Long taskId) {
        return marksService.putComment(markId, taskId);
    }

    @PutMapping("/marksScrum/{id}")
    public ResponseEntity<MarksScrum> updateMarksScrum(@PathVariable Long id,
                                                       @RequestBody MarksScrum marksScrumDetails) {
        return marksService.updateMarksScrum(id, marksScrumDetails);
    }

    @DeleteMapping("/marksScrum/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteMarksScrum(@PathVariable Long id) {
        return marksService.deleteMarksScrum(id);
    }
}
