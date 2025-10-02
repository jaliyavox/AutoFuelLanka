package com.autofuellanka.systemmanager.config;

import com.autofuellanka.systemmanager.model.RoleCode;
import com.autofuellanka.systemmanager.model.User;
import com.autofuellanka.systemmanager.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Set;

@Configuration
public class DevDataSeeder {
    @Bean
    CommandLineRunner seedAdmin(UserRepository users) {
        return args -> {
            String adminEmail = "admin@afl.lk";
            if (!users.existsByEmail(adminEmail)) {
                User admin = new User();
                admin.setEmail(adminEmail);
                admin.setPasswordHash("{noop}admin123"); // no encryption
                admin.setFullName("IT Executive");
                admin.setPhone("011-0000000");
                admin.setAddress("HQ");
                admin.setEnabled(true);
                admin.setRoles(Set.of(RoleCode.IT_EXEC));
                users.save(admin);

                System.out.println("Seeded IT Executive: " + adminEmail + " / admin123");
            }
        };
    }

}
