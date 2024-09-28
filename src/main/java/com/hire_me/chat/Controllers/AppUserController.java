package com.hire_me.chat.Controllers;

import com.hire_me.chat.Entity.AppUser;
import com.hire_me.chat.Repository.AppUserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class AppUserController {

    @Autowired
    private AppUserRepo appUserRepo;

    public AppUserController(AppUserRepo appUserRepo) {
        this.appUserRepo = appUserRepo;
    }

    @PostMapping("/{id}")
    public void test(@PathVariable Integer id){
        AppUser user = new AppUser();
        user.setAppUserId(id);
        appUserRepo.save(user);

    }

    @GetMapping("/find")
    public List<AppUser> test2(){
        return appUserRepo.findAll();

    }










}
