package com.hire_me.chat.Repository;

import com.hire_me.chat.Entity.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;


public interface AppUserRepo extends JpaRepository<AppUser, Integer> {

}
