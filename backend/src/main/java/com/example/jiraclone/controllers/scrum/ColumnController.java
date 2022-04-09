package com.example.jiraclone.controllers.scrum;


import com.example.jiraclone.entities.scrum.ColumnScrum;
import com.example.jiraclone.entities.scrum.Sprint;
import com.example.jiraclone.exceptions.ResourceNotFoundException;
import com.example.jiraclone.repositories.scrum.ColumnScrumRepository;
import com.example.jiraclone.repositories.scrum.SprintRepository;
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
public class ColumnController {


    @Autowired
    ColumnScrumRepository columnScrumRepository;

    @Autowired
    SprintRepository sprintRepository;

    @GetMapping("/columns")
    public List<ColumnScrum> getAllColumns() {
        return columnScrumRepository.findAll();
    }

    @GetMapping("/columns/{sprintId}")
    public List<ColumnScrum> getAllColumnsForSprint(@PathVariable Long sprintId) {

        Sprint sprint = sprintRepository.findById(sprintId).get();
        List<ColumnScrum> columnScrums = columnScrumRepository.findAll();

        ArrayList<ColumnScrum> columnScrumsArray = new ArrayList<>();

        for (int i = 0; i <= columnScrums.size() - 1; i++) {

            if (columnScrums.get(i).getSprint_column() == sprint) {
                columnScrumsArray.add(columnScrums.get(i));
            }
        }
        return columnScrumsArray;
    }

    @PostMapping("/columns")
    public ColumnScrum createColumn(@RequestBody ColumnScrum columnScrum) {
        return columnScrumRepository.save(columnScrum);
    }

    @PutMapping("/columns/{columnId}/{sprintId}")
    public ResponseEntity<ColumnScrum> createColumnForSprint(@PathVariable Long columnId,
                                                             @PathVariable Long sprintId) {

        ColumnScrum columnScrum = columnScrumRepository.findById(columnId).get();
        Sprint sprint = sprintRepository.findById(sprintId).get();

        columnScrum.setSprint_column(sprint);

        ColumnScrum updatedColumnScrum = columnScrumRepository.save(columnScrum);

        return ResponseEntity.ok(updatedColumnScrum);
    }

    @DeleteMapping("/columns/{id}")//todo
    public ResponseEntity<Map<String, Boolean>> deleteColumn(@PathVariable Long id) {
        ColumnScrum columnScrum = columnScrumRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Column not exist with id:" + id));

        columnScrumRepository.delete(columnScrum);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
