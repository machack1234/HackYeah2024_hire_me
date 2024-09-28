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
        System.out.println("OSRANE DUPSKO 2");
        try {
            // Parse the incoming JSON string

            JsonNode jsonNode = objectMapper.readTree(jsonString);
            System.out.println("OSRANE DUPSKO 3");
            JsonNode specificValue = jsonNode.get("desc");

            // Example response, include the new JSON or specific value
            if (specificValue != null) {
                // Do something with the specific value if needed
                System.out.println("Extracted Value: " + specificValue.asText());
                Course course = new Course();
                course.setDescription(specificValue.asText());
                courseRepo.save(course);
                return ResponseEntity.status(HttpStatus.CREATED).build(); // Return 200 OK
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); // Return 404 Not Found if key doesn't exist
            }

        } catch (Exception e) {
            System.out.println("OSRANE DUPSKO 5");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();

        }

    }
}
