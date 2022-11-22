package com.luv2code.ecommerce.entity;

import lombok.Data;
import org.hibernate.mapping.Join;

import javax.persistence.*;

@Entity
@Table(name = "address")
@Data
public class Address {
    @Column(name = "id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "street")
    private String street;

    @Column(name = "city")
    private String city;

    @Column(name = "zip_code")
    private String zipCode;

    @Column(name = "country")
    private String country;

    @Column(name = "state")
    private String state;

    @OneToOne
    @PrimaryKeyJoinColumn
    private Order order;
}
