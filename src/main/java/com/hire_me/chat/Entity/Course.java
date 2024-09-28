package com.hire_me.chat.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.scheduling.config.Task;

import java.util.List;
import java.util.Set;

@Entity
@Table(name = "Course")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Integer courseId;


    @Column(columnDefinition = "text",unique = true)
    private String description;

    @ManyToMany
    @JoinTable(
            name = "user_courses",
            joinColumns = @JoinColumn(name = "course_id"),
            inverseJoinColumns = @JoinColumn(name = "app_user_id")
    )
    private Set<AppUser> appUsers;
}
