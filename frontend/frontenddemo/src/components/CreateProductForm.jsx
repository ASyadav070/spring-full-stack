import React, { useState } from 'react';
import { createProduct } from '../services/productService';

const CreateProductForm = ({ onClose, onProductCreated }) => {
    const [formData, setFormData] = useState({
        productName: '',
        productSKU: '',
        productDescription: '',
        productPrice: '',
        productDiscount: ''
    });
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (formData.productName.length < 3) {
            newErrors.productName = 'Product name must be at least 3 characters long.';
        }
        if (formData.productDescription.length < 20) {
            newErrors.productDescription = 'Product description must be at least 20 characters long.';
        }
        if (!formData.productSKU) {
            newErrors.productSKU = 'Product SKU is required.';
        }
        if (formData.productPrice <= 0) {
            newErrors.productPrice = 'Price must be a positive number.';
        }
        if (formData.productDiscount < 0 || formData.productDiscount > 100) {
            newErrors.productDiscount = 'Discount must be between 0 and 100.';
        }
        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});
        try {
            const newProduct = await createProduct(formData);
            onProductCreated(newProduct.data);
            onClose();
        } catch (error) {
            console.error('Failed to create product', error);
            if (error.response && error.response.data) {
                // Handle backend validation errors if any
                setErrors({ api: error.response.data.message || 'An error occurred.' });
            }
        }
    };

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <h2>Create New Product</h2>
                <form onSubmit={handleSubmit} noValidate>
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            name="productName"
                            value={formData.productName}
                            onChange={handleChange}
                        />
                        {errors.productName && <p className="error-text">{errors.productName}</p>}
                    </div>
                    <div className="form-group">
                        <label>SKU</label>
                        <input
                            type="text"
                            name="productSKU"
                            value={formData.productSKU}
                            onChange={handleChange}
                        />
                        {errors.productSKU && <p className="error-text">{errors.productSKU}</p>}
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            name="productDescription"
                            value={formData.productDescription}
                            onChange={handleChange}
                            rows="4"
                        ></textarea>
                        {errors.productDescription && <p className="error-text">{errors.productDescription}</p>}
                    </div>
                    <div className="form-group">
                        <label>Price</label>
                        <input
                            type="number"
                            name="productPrice"
                            value={formData.productPrice}
                            onChange={handleChange}
                        />
                        {errors.productPrice && <p className="error-text">{errors.productPrice}</p>}
                    </div>
                    <div className="form-group">
                        <label>Discount</label>
                        <input
                            type="number"
                            name="productDiscount"
                            value={formData.productDiscount}
                            onChange={handleChange}
                        />
                        {errors.productDiscount && <p className="error-text">{errors.productDiscount}</p>}
                    </div>
                    {errors.api && <p className="error-text">{errors.api}</p>}
                    <div className="modal-actions">
                        <button type="submit" className="btn-primary">Create Product</button>
                        <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateProductForm;
