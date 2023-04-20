package ru.kata.spring.boot_security.demo.services;


import ru.kata.spring.boot_security.demo.models.Role;
import ru.kata.spring.boot_security.demo.models.User;

import java.util.List;
import java.util.Set;

public interface UserService {
    List<User> findAll();

    User findOne(int id);
    User findOne();

    void save(User user);

    void update(User user);

    void delete(int id);


}
