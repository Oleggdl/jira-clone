package com.example.jiraclone.controllers.scrum;


import com.example.jiraclone.entities.scrum.ColumnScrum;
import com.example.jiraclone.exceptions.ResourceNotFoundException;
import com.example.jiraclone.repositories.scrum.ColumnScrumRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("jira-clone/scrum")
public class ColumnController {


    @Autowired
    ColumnScrumRepository columnScrumRepository;

    @GetMapping("/columns")
    public List<ColumnScrum> getAllColumns() {
        return columnScrumRepository.findAll();
    }

    @PostMapping("/columns")
    public ColumnScrum createColumn(@RequestBody ColumnScrum columnScrum) {
        return columnScrumRepository.save(columnScrum);
    }

    @GetMapping("/columns/{id}")
    public ResponseEntity<ColumnScrum> getColumnById(@PathVariable Long id) {

        ColumnScrum columnScrum = columnScrumRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Column not exist with id:" + id));

        return ResponseEntity.ok(columnScrum);
    }

    @PutMapping("/columns/{id}")
    public ResponseEntity<ColumnScrum> updateColumn(@PathVariable Long id,
                                                    @RequestBody ColumnScrum columnScrumDetails) {

        ColumnScrum columnScrum = columnScrumRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Column not exist with id:" + id));

        columnScrum.setColumn_name(columnScrumDetails.getColumn_name());
        ColumnScrum updateColumnScrum = columnScrumRepository.save(columnScrum);

        return ResponseEntity.ok(updateColumnScrum);
    }

    @DeleteMapping("/columns/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteColumn(@PathVariable Long id) {
        ColumnScrum columnScrum = columnScrumRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Column not exist with id:" + id));

        columnScrumRepository.delete(columnScrum);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
