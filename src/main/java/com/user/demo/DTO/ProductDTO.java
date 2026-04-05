package com.user.demo.DTO;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class ProductDTO {
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

    @NotBlank(message = "ProductSKU is mandatory")
    private String productSKU;

    @NotNull
    @Positive(message="Product price must be positive")
    private double productPrice;

    @PositiveOrZero
    @Max(value=100, message = "Product discount cannot exceed 100%")
    private int productDiscount;
}
