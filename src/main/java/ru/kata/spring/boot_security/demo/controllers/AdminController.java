package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.models.User;
import ru.kata.spring.boot_security.demo.services.RolesService;
import ru.kata.spring.boot_security.demo.services.UserService;
//import ru.kata.spring.boot_security.demo.util.UserNewValidator;
import javax.validation.Valid;


@Controller
public class AdminController {


    private final RolesService rolesService;
    private final UserService userService;
//    private final UserNewValidator userNewValidator;


    @Autowired
    public AdminController(RolesService rolesService, UserService userService) {
        this.rolesService = rolesService;
        this.userService = userService;
    }

    @GetMapping("/admin/user")
    public String showAllUser(Model model) {
        model.addAttribute("authUser", userService.findOne());
        model.addAttribute("users", userService.findAll());
        model.addAttribute("newUser", new User());
        model.addAttribute("allRoles", rolesService.getRoles());
        return "admin_panel_user_table";
    }


    @PostMapping("/admin/user")
    public String create(@ModelAttribute("user") @Valid User user, BindingResult bindingResult) {
//        userNewValidator.validate(user, bindingResult);
        if (bindingResult.hasErrors()) {
            return "redirect:/admin/user";
        }
        userService.save(user);
        return "redirect:/admin/user";
    }


    @PatchMapping("/admin/{id}")
    public String update(@ModelAttribute("user") @Valid User user, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return "redirect:/admin/user";
        }
        userService.save(user);
        return "redirect:/admin/user";
    }


    @DeleteMapping("/admin/{id}")
    public String delete(@PathVariable("id") int id) {
        userService.delete(id);
        return "redirect:/admin/user";
    }


}
