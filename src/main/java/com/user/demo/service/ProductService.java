package com.user.demo.service;

import com.user.demo.DTO.ProductDTO;
import com.user.demo.model.Product;
import com.user.demo.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public ProductDTO createProduct(ProductDTO productDTO) {
        Product product = mapToEntity(productDTO);
        Product savedProduct = productRepository.save(product);
        return mapToDTO(savedProduct);
    }

    public List<ProductDTO> getAllProducts() {
        return productRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public Optional<ProductDTO> getProductById(long id) {
        return productRepository.findById(id).map(this::mapToDTO);
    }

    public boolean deleteProduct(long id) {
        if (productRepository.existsById(id)) {
            productRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public Optional<ProductDTO> updateProduct(long id, ProductDTO productDTO) {
        return productRepository.findById(id).map(existingProduct -> {
            existingProduct.setProductName(productDTO.getProductName());
            existingProduct.setProductCategory(productDTO.getProductCategory());
            existingProduct.setProductDescription(productDTO.getProductDescription());
            existingProduct.setProductSKU(productDTO.getProductSKU());
            existingProduct.setProductPrice(productDTO.getProductPrice());
            existingProduct.setProductDiscount(productDTO.getProductDiscount());

            Product updatedProduct = productRepository.save(existingProduct);
            return mapToDTO(updatedProduct);
        });
    }

    private Product mapToEntity(ProductDTO dto) {
        Product product = new Product();
        product.setProductName(dto.getProductName());
        product.setProductCategory(dto.getProductCategory());
        product.setProductDescription(dto.getProductDescription());
        product.setProductSKU(dto.getProductSKU());
        product.setProductPrice(dto.getProductPrice());
        product.setProductDiscount(dto.getProductDiscount());
        return product;
    }

    private ProductDTO mapToDTO(Product product) {
        ProductDTO dto = new ProductDTO();
        dto.setProductId(product.getProductId());
        dto.setProductName(product.getProductName());
        dto.setProductCategory(product.getProductCategory());
        dto.setProductDescription(product.getProductDescription());
        dto.setProductSKU(product.getProductSKU());
        dto.setProductPrice(product.getProductPrice());
        dto.setProductDiscount((int) product.getProductDiscount());
        return dto;
    }
}
