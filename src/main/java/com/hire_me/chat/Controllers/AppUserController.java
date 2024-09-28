package com.hire_me.chat.Controllers;

import com.hire_me.chat.Entity.AppUser;
import com.hire_me.chat.Repository.AppUserRepo;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class AppUserController {

    private AppUserRepo appUserRepo;

    public AppUserController(AppUserRepo appUserRepo) {
        this.appUserRepo = appUserRepo;
    }

    @GetMapping("/user/{name}")
    public ResponseEntity<AppUser> test(@PathVariable String name){
        AppUser user = new AppUser(1,name);
        return ResponseEntity.ok(appUserRepo.save(user));
    }

    @GetMapping("/findall")
    public List<AppUser> test2(){

        return appUserRepo.findAll();
    }

    @GetMapping("/cos")
    public String test3(){

        return "Damian";
    }








}
