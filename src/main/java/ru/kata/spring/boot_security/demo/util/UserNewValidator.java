//package ru.kata.spring.boot_security.demo.util;
//
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Component;
//import org.springframework.validation.Errors;
//import org.springframework.validation.Validator;
//import ru.kata.spring.boot_security.demo.models.User;
//import ru.kata.spring.boot_security.demo.repositories.UserRepository;
//import java.util.Optional;
//
//
//@Component
//public class UserNewValidator implements Validator {
//
//    private final UserRepository userRepository;
//
//    @Autowired
//    public UserNewValidator(UserRepository userRepository) {
//        this.userRepository = userRepository;
//    }
//
//    @Override
//    public boolean supports(Class<?> clazz) {
//        return User.class.equals(clazz);
//    }
//
//    @Override
//    public void validate(Object target, Errors errors) {
//        User user = (User) target;
//        Optional<User> user_n = userRepository.findByName(user.getUsername());
//        if (user_n.isPresent()) {
//            errors.rejectValue("username", "", "This email is already in use");
//        }
//    }
//}