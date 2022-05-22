package com.example.jiraclone.controllers.scrum;


import com.example.jiraclone.entities.scrum.ColumnScrum;
import com.example.jiraclone.services.ColumnService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("TaskManager/scrum")
public class ColumnController {

    @Autowired
    private ColumnService columnService;

    @GetMapping("/columns")
    public List<ColumnScrum> getAllColumns() {
        return columnService.getAllColumns();
    }

    @GetMapping("/columns/{sprintId}")
    public List<ColumnScrum> getAllColumnsForSprint(@PathVariable Long sprintId) {
        return columnService.getAllColumnsForSprint(sprintId);
    }

    @PostMapping("/columns")
    public ColumnScrum createColumn(@RequestBody ColumnScrum columnScrum) {
        return columnService.createColumn(columnScrum);
    }

    @PutMapping("/columns/{columnId}/{sprintId}")
    public ResponseEntity<ColumnScrum> createColumnForSprint(@PathVariable Long columnId,
                                                             @PathVariable Long sprintId) {
        return columnService.createColumnForSprint(columnId, sprintId);
    }

    @DeleteMapping("/columns/{id}")//todo
    public ResponseEntity<Map<String, Boolean>> deleteColumn(@PathVariable Long id) {
        return columnService.deleteColumn(id);
    }
}
