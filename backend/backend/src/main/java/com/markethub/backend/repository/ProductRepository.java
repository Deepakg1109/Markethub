package com.markethub.backend.repository;

import com.markethub.backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByOwnerEmail(String ownerEmail);
}