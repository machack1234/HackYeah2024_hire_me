package com.hire_me.chat.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.scheduling.config.Task;

public interface TaskRepo extends JpaRepository<Task,Integer> {
}
