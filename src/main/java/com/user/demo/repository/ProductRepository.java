package com.user.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.user.demo.model.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
}
