package com.hire_me.chat.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "AppUser")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class AppUser {
    @GeneratedValue
    @Id
    Integer Id;

    String name;







}
