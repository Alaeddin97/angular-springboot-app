package com.luv2code.ecommerce.dao;

import com.luv2code.ecommerce.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:3001/")
@RepositoryRestResource(collectionResourceRel = "Product")
public interface ProductRepository extends JpaRepository<Product, Long> {
    Page<Product> findByCategoryId(@Param("id") Long id, Pageable pageable);
    @Query(" select p from Product p where lower(p.name) like lower(concat('%',:name,'%'))")
    Page<Product> findByName(@Param("name") String name, Pageable pageable);
    Page<Product> findById(@Param("id") Long id, Pageable pageable);
}
