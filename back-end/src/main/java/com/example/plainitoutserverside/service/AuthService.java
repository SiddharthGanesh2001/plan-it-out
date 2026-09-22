package com.example.plainitoutserverside.service;

import com.example.plainitoutserverside.dto.AuthResponse;
import com.example.plainitoutserverside.dto.LoginRequest;
import com.example.plainitoutserverside.dto.RegisterRequest;
import com.example.plainitoutserverside.model.User;
import com.example.plainitoutserverside.repository.UserRepo;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthService(UserRepo userRepo,
                       PasswordEncoder passwordEncoder,
                       JwtService jwtService,
                       AuthenticationManager authenticationManager) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    public AuthResponse register(RegisterRequest request) {
        if (userRepo.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("An account with this email already exists");
        }

        String hashedPassword = passwordEncoder.encode(request.getPassword());
        User user = userRepo.save(request.getEmail(), request.getUserName(), hashedPassword);
        if (user == null) {
            throw new IllegalStateException("Failed to create user");
        }

        user.setPassword(hashedPassword);
        user.setRole("USER");

        String token = jwtService.generateToken(user);
        return new AuthResponse(token, user.getUserId(), user.getUserName(), user.getUserEmail());
    }

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        User user = userRepo.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalStateException("User not found after authentication"));

        String token = jwtService.generateToken(user);
        return new AuthResponse(token, user.getUserId(), user.getUserName(), user.getUserEmail());
    }
}
