package com.example.jiraclone.services;

import com.example.jiraclone.entities.scrum.ColumnScrum;
import com.example.jiraclone.entities.scrum.Sprint;
import com.example.jiraclone.exceptions.ResourceNotFoundException;
import com.example.jiraclone.repositories.scrum.ColumnScrumRepository;
import com.example.jiraclone.repositories.scrum.SprintRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ColumnService {

    @Autowired
    ColumnScrumRepository columnScrumRepository;

    @Autowired
    SprintRepository sprintRepository;

    public List<ColumnScrum> getAllColumns() {
        return columnScrumRepository.findAll();
    }

    public List<ColumnScrum> getAllColumnsForSprint(Long sprintId) {
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

    public ColumnScrum createColumn(ColumnScrum columnScrum) {
        return columnScrumRepository.save(columnScrum);
    }

    public ResponseEntity<ColumnScrum> createColumnForSprint(Long columnId, Long sprintId) {
        ColumnScrum columnScrum = columnScrumRepository.findById(columnId).get();
        Sprint sprint = sprintRepository.findById(sprintId).get();
        columnScrum.setSprint_column(sprint);
        ColumnScrum updatedColumnScrum = columnScrumRepository.save(columnScrum);
        return ResponseEntity.ok(updatedColumnScrum);
    }

    //todo
    public ResponseEntity<Map<String, Boolean>> deleteColumn(Long id) {
        ColumnScrum columnScrum = columnScrumRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Column not exist with id:" + id));
        columnScrumRepository.delete(columnScrum);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
