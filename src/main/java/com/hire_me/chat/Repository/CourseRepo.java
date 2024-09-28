package com.hire_me.chat.Repository;

import com.hire_me.chat.Entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepo extends JpaRepository<Course,Integer> {
}
