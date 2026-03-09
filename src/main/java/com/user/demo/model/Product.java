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

    @NotBlank(message = "Product name is mandatory")
    @Size(min = 2, max = 15, message = "Product name must be between 2 and 15 characters")
        private String productName;

    @NotBlank(message = "Product category is mandatory")
    @Size(min = 2, max = 15, message = "Product category must be between 2 and 15 characters")
    private String productCategory;

    @NotBlank(message = "Product description is mandatory")
    @Size(min = 2, max = 100, message = "Write Product description")
    private String productDescription;


    @NotNull
    @Positive(message="Product price must be positive")
    private double productPrice;

    @PositiveOrZero
    @Max(value=100, message = "Product discount cannot exceed 100%")
    private double productDiscount;

}
