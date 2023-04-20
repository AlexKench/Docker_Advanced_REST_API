package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.models.User;
import ru.kata.spring.boot_security.demo.services.RolesService;
import ru.kata.spring.boot_security.demo.services.UserService;
import ru.kata.spring.boot_security.demo.util.UserNewValidator;

import javax.validation.Valid;

@Controller
public class AdminController {
    private final RolesService rolesService;
    private final UserService userService;
    private final UserNewValidator userNewValidator;


    @Autowired
    public AdminController(RolesService rolesService, UserService userService, UserNewValidator userNewValidator) {
        this.rolesService = rolesService;
        this.userService = userService;
        this.userNewValidator = userNewValidator;
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
        model.addAttribute("allRoles", rolesService.getRoles());
        return "new";
    }

    @PostMapping("/admin/user")
    public String create(@ModelAttribute("user") @Valid User user,
                         BindingResult bindingResult) {
        userNewValidator.validate(user, bindingResult);
        if (bindingResult.hasErrors()) {
            return "new";
        }
        userService.save(user);
        return "redirect:/admin/user";
    }

    @GetMapping("/admin/{id}/update")
    public String showPageEditUser(Model model, @PathVariable("id") int id) {
        model.addAttribute("user", userService.findOne(id));
        model.addAttribute("allRoles", rolesService.getRoles());
        return "update";
    }

    @PatchMapping("/admin/{id}")
    public String update(@ModelAttribute("user") @Valid User user, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return "update";
        }
        userService.update(user);
        return "redirect:user";
    }

    @DeleteMapping("/admin/{id}")
    public String delete(@PathVariable("id") int id) {
        userService.delete(id);
        return "redirect:user";
    }


}
