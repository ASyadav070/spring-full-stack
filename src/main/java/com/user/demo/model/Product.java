package com.user.demo.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "product_table")
@Data

public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) //generates the value of the primary key automatically when a new record is inserted into the database. The IDENTITY strategy relies on the database to generate the primary key value, typically using an auto-incrementing column.
    private long productId;

    @Column(nullable = false)
        private String productName;

    @Column(nullable = false)
    private String productCategory;

    @Column(nullable = false)
    private String productDescription;

    @Column(unique = true, nullable = false)
    private String productSKU;

//    @Column(unique = true)
//    private String productCode;


    private double productPrice;


    private double productDiscount;

}
