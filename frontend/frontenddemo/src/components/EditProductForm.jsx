import React, { useState, useEffect } from 'react';
import { updateProduct } from '../services/productService';

const EditProductForm = ({ product, onClose, onProductUpdated }) => {
    const [formData, setFormData] = useState({ ...product });

    useEffect(() => {
        setFormData({ ...product });
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updated = await updateProduct(product.productId, formData);
            onProductUpdated(updated.data);
            onClose();
        } catch (error) {
            console.error('Failed to update product', error);
        }
    };

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <h2>Edit Product</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            name="productName"
                            value={formData.productName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>SKU</label>
                        <input
                            type="text"
                            name="productSKU"
                            value={formData.productSKU}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            name="productDescription"
                            value={formData.productDescription}
                            onChange={handleChange}
                            rows="4"
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label>Price</label>
                        <input
                            type="number"
                            name="productPrice"
                            value={formData.productPrice}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Discount</label>
                        <input
                            type="number"
                            name="productDiscount"
                            value={formData.productDiscount}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="modal-actions">
                        <button type="submit" className="btn-primary">Save Changes</button>
                        <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProductForm;
