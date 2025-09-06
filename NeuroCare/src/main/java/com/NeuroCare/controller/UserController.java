package com.NeuroCare.controller;

import com.NeuroCare.model.AuthResponse;
import com.NeuroCare.model.User;
import com.NeuroCare.repository.UserRepository;
import com.NeuroCare.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auth")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/signup")
    public String signup(@RequestBody User user) {
        // Check if user already exists
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return "User with this email already exists!";
        }

        userRepository.save(user);
        return "User registered successfully!";
    }

    @PostMapping("/login")
    public Object login(@RequestBody User loginRequest) {
        try {
            return userRepository.findByEmailAndPassword(loginRequest.getEmail(), loginRequest.getPassword())
                    .map(user -> {
                        String token = JwtUtil.generateToken(user.getEmail());
                        return new AuthResponse(token);
                    })
                    .orElse(new AuthResponse("Invalid email or password!"));
        } catch (Exception e) {
            e.printStackTrace();
            return new AuthResponse("Error during login: " + e.getMessage());
        }
    }


    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
