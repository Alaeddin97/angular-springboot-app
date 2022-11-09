package com.luv2code.ecommerce.repository;

import com.luv2code.ecommerce.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:3001/")
@RepositoryRestResource(collectionResourceRel = "Product")
public interface ProductRepository extends JpaRepository<Product, Long> {
}
