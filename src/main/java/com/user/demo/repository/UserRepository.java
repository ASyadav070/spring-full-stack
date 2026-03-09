package com.user.demo.repository;

import com.user.demo.model.User;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);  //find user by email, method signature is important, spring data jpa will automatically implement this method based on the name
    boolean existsByEmail(String email);  //user exists by this email or not

//    method signature with query ;
//    @Query("SELECT * from ()");
//    boolean existsByEmail(String email);


}
