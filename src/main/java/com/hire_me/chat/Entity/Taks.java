package com.hire_me.chat.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "Task")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Taks {
    @GeneratedValue
    @Id

    Integer taskId;

    LocalDate date;

    boolean isDone;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

}
