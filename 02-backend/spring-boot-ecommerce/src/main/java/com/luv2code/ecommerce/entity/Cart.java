package com.luv2code.ecommerce.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.Set;

@Table(name = "cart")
@Entity
@Data
public class Cart {
    @Column(name = "product_id")
    @OneToMany(fetch = FetchType.EAGER,cascade = CascadeType.ALL)
    private Set<Product>products;
}
