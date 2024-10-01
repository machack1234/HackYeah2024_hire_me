package com.hire_me.chat.Controllers;

import com.fasterxml.jackson.databind.util.JSONPObject;
import com.hire_me.chat.Entity.Course;
import com.hire_me.chat.Repository.CourseRepo;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class CourseController {
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final CourseRepo courseRepo;

    public CourseController(CourseRepo courseRepo) {
        this.courseRepo = courseRepo;
    }

    @GetMapping("/show")
    @ResponseBody
    public List<Course> show(){
        return courseRepo.findAll();
    }

    @PostMapping("/course")
    public ResponseEntity<HttpStatusCode> addDescription(@RequestBody String jsonString) {
        try {


            JsonNode jsonNode = objectMapper.readTree(jsonString);

            JsonNode specificValue = jsonNode.get("desc");


            if (specificValue != null) {

                System.out.println("Extracted Value: " + specificValue.asText());
                Course course = new Course();
                course.setDescription(specificValue.asText());
                courseRepo.save(course);
                return ResponseEntity.status(HttpStatus.CREATED).build();
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }

        } catch (Exception e) {

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();

        }

    }
}
