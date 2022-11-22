package com.luv2code.ecommerce.entity;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.math.BigDecimal;
import java.sql.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "orders")
@Data
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "order_tacking_number")
    private String orderTrackingNumber;

    @Column(name = "total_price")
    private BigDecimal totalPrice;

    @Column(name = "total_quantity")
    private int totalQuantity;

    @Column(name = "status")
    private String status;

    @Column(name = "date_created")
    @CreationTimestamp
    private Date dateCreated;

    @CreationTimestamp
    @Column(name = "last_updated")
    private Date lastUpdated;

    @OneToOne
    @JoinColumn(name = "billing_address_id",referencedColumnName = "id")
    private Address billingAddress;

    @OneToOne
    @JoinColumn(name = "shipping_address_id",referencedColumnName = "id")
    private Address shippingAddress;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @OneToMany(cascade = CascadeType.ALL)
    private Set<OrderItem> orderItems=new HashSet<>();

    public void add(OrderItem orderItem){
        if(orderItems==null){
            orderItems=new HashSet<>();
        }
        orderItems.add(orderItem);
        orderItem.setOrder(this);
    }
}





























