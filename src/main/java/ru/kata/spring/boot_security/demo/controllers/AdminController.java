package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.models.User;
import ru.kata.spring.boot_security.demo.services.UserService;

@Controller
public class AdminController {

    private final UserService userService;


    @Autowired
    public AdminController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/admin/user")
    public String showAllUser(Model model) {
        model.addAttribute("users", userService.findAll());
        return "index";
    }
    @GetMapping("/admin/{id}")
    public String showOneUser(@PathVariable("id") int id, Model model) {
        model.addAttribute("user", userService.findOne(id));
        return "show";
    }
    @GetMapping("/admin/new")
    public String showPageCreatingUser(Model model) {
        model.addAttribute("user", new User());
        model.addAttribute("allRoles", userService.getRoles());
        return "new";
    }

    @PostMapping("/admin/user")
    public String create(@ModelAttribute("user") User user) {
        userService.save(user);
        return "redirect:/admin/user";
    }

    @GetMapping("/admin/{id}/update")
    public String showPageEditUser(Model model, @PathVariable("id") int id) {
        model.addAttribute("user", userService.findOne(id));
        model.addAttribute("allRoles", userService.getRoles());
        return "update";
    }

    @PatchMapping("/admin/{id}")
    public String update(@ModelAttribute("user") User user) {
        userService.update(user);
        return "redirect:user";
    }

    @DeleteMapping("/admin/{id}")
    public String delete(@PathVariable("id") int id) {
        userService.delete(id);
        return "redirect:user";
    }


}
