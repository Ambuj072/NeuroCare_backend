package com.NeuroCare.controller;

import com.NeuroCare.model.User;
import com.NeuroCare.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/onboarding")
public class OnboardingController{
    private final UserRepository userRepository;

    public OnboardingController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    @GetMapping("/questions")
    public List<String> getQuestions(){
        return Arrays.asList(
                "Aap apna din kaisa mehsoos kar rahe ho?",
                "Aapko aksar kis cheez se stress hota hai?",
                "Aapko din me sabse zyada energy kab hoti hai?",
                "Aap apni sleep routine ko kaise describe karoge?",
                "Aapko kis cheez se khushi milti hai?",
                "Kya aapko aksar anxiety feel hoti hai? Agar haan, kab?",
                "Aap apni diet ke baare me kya kehna chahenge?",
                "Aapko apne career/education se kitna satisfaction hai?",
                "Kya aapko kabhi lagta hai ki aapko support system ki kami hai?",
                "Aapke hobbies ya pasandida activities kya hain?",
                "Aap apne family/friends ke sath relation ko kaise rate karenge (1-10)?",
                "Aap apne emotions ko express karne me comfortable ho?",
                "Aapko relaxation ke liye kya karna pasand hai?",
                "Aapko abhi sabse bada challenge kya lagta hai?",
                "Agar aap ek cheez apne life me improve kar sakte ho, to wo kya hogi?"
        );
    }


    @PostMapping("/submit/{userId}")
    public User submitAnswers(@PathVariable String userId, @RequestBody Map<String, String> answers) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setOnboardingAnswers(answers); // 👈 ye field tumne User model me add kiya tha
        return userRepository.save(user);
    }

    //test
    @GetMapping("/answers/{userId}")
    public Map<String, String> getAnswers(@PathVariable String userId) {
        return userRepository.findById(userId)
                .map(User::getOnboardingAnswers)
                .orElse(Collections.emptyMap());
    }
}
