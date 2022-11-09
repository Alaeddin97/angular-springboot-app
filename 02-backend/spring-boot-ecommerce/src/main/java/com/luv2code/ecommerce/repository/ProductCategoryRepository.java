package com.luv2code.ecommerce.repository;

import com.luv2code.ecommerce.entity.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:3001/")
@RepositoryRestResource(collectionResourceRel = "ProductCategory",path="product-category")
public interface ProductCategoryRepository extends JpaRepository<ProductCategory,Long> {
}
