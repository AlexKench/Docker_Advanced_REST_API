//package ru.kata.spring.boot_security.demo.DB;
//
//import org.springframework.stereotype.Component;
//import ru.kata.spring.boot_security.demo.models.Role;
//import ru.kata.spring.boot_security.demo.models.User;
//import ru.kata.spring.boot_security.demo.services.UserService;
//
//
//import javax.annotation.PostConstruct;
//import java.util.Set;
//
//@Component
//public class DataInit {
//
//    private final UserService userService;
//
//
//    public DataInit(UserService userService) {
//        this.userService = userService;
//
//    }
//    @PostConstruct
//    protected void CreateAdmin() {
//        userService.save(new User("a","a", 30, "a", "a",Set.of(new Role("ROLE_ADMIN"))));
//    }
//}