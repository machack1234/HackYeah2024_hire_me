package com.hire_me.chat.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Entity
@Table(name = "AppUser")
@AllArgsConstructor
@NoArgsConstructor
@Setter
public class AppUser {
    @Id
    private Integer appUserId;


    @ManyToMany(mappedBy = "appUsers")
    private Set<Course> courses;



}
