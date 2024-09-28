package com.hire_me.chat.Repository;

import com.hire_me.chat.Entity.AppUser;
import org.springframework.data.repository.CrudRepository;

public interface AppUserRepo extends CrudRepository<Integer, AppUser> {

}
