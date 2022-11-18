package com.luv2code.ecommerce.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.List;
@Table(name = "country")
@Entity
@Data
public class Country {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;
    @Column(name = "code")
    private String code;
    @Column(name = "name")
    private String name;
    @OneToMany(mappedBy = "country")
    private List<State> states;
}
