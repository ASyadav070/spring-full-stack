import React, { useState, useEffect } from 'react';
import { getAllProducts, getMyProducts, deleteProduct } from '../services/productService';
import { useAuth } from '../hooks/useAuth';
import EditProductForm from './EditProductForm';
import CreateProductForm from './CreateProductForm'; // Import the new component

const ProductManager = () => {
    const [products, setProducts] = useState([]);
    const [view, setView] = useState('all');
    const { user } = useAuth();
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = view === 'all' ? await getAllProducts() : await getMyProducts();
                setProducts(response.data);
            } catch (error) {
                console.error('Failed to fetch products', error);
            }
        };
        if (user) { // Fetch products only when user is logged in
            fetchProducts();
        }
    }, [view, user]);

    const handleDelete = async (productId) => {
        try {
            await deleteProduct(productId);
            setProducts(products.filter(product => product.productId !== productId));
        } catch (error) {
            console.error('Failed to delete product', error);
        }
    };

    const handleEdit = (product) => {
        setSelectedProduct(product);
        setEditModalOpen(true);
    };

    const handleProductUpdated = (updatedProduct) => {
        setProducts(products.map(p => p.productId === updatedProduct.productId ? updatedProduct : p));
    };

    const handleProductCreated = (newProduct) => {
        setProducts(prevProducts => [...prevProducts, newProduct]);
        // Optionally switch to 'My Products' view
        setView('my');
    };

    const canEditOrDelete = (product) => {
        if (!user) return false;
        // Check if the user is an ADMIN or if the user's ID matches the product's owner ID
        return user.role === 'ADMIN' || user.userId === product.userId;
    };

    return (
        <div>
            <h2>Product Management</h2>
            <div className="manager-controls">
                <button 
                    className={view === 'all' ? 'active' : ''}
                    onClick={() => setView('all')}
                >
                    All Products
                </button>
                <button 
                    className={view === 'my' ? 'active' : ''}
                    onClick={() => setView('my')}
                >
                    My Products
                </button>
                <button className="create-btn" onClick={() => setCreateModalOpen(true)}>
                    &#43; Create New Product
                </button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>SKU</th>
                        <th>Price</th>
                        <th>Owner</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.productId}>
                            <td>{product.productName}</td>
                            <td>{product.productSKU}</td>
                            <td>{product.productPrice}</td>
                            <td>{product.userName}</td>
                            <td>
                                {canEditOrDelete(product) && (
                                    <div className="action-buttons">
                                        <button className="edit-btn" onClick={() => handleEdit(product)}>Edit</button>
                                        <button className="delete-btn" onClick={() => handleDelete(product.productId)}>Delete</button>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isEditModalOpen && (
                <EditProductForm 
                    product={selectedProduct}
                    onClose={() => setEditModalOpen(false)}
                    onProductUpdated={handleProductUpdated}
                />
            )}

            {isCreateModalOpen && (
                <CreateProductForm
                    onClose={() => setCreateModalOpen(false)}
                    onProductCreated={handleProductCreated}
                />
            )}
        </div>
    );
};

export default ProductManager;
