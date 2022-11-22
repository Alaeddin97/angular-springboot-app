package com.luv2code.ecommerce.entity;

import lombok.Data;
import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "customer")
@Data
public class Customer {
    @Column(name = "id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "email")
    private String email;

    @OneToMany(mappedBy = "customer",cascade = CascadeType.ALL)
    private Set<Order> orders=new HashSet<>();

    public void add(Order order){
        if(orders==null){
            orders=new HashSet<>();
        }
        orders.add(order);
        order.setCustomer(this);
    }
}















