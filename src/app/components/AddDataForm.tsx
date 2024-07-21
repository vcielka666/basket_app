"use client";
import { useState } from 'react';

const AddDataForm = () => {
  const [shopCenterName, setShopCenterName] = useState('');
  const [productName, setProductName] = useState('');
  const [productWeight, setProductWeight] = useState('');
  const [productPrice, setProductPrice] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          shopCenterName,
          productName,
          productWeight: parseFloat(productWeight),
          productPrice: parseFloat(productPrice),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        console.log('Product added:', data);
      } else {
        console.error('Failed to add product:', data);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error submitting form:', error.message);
      } else {
        console.error('Unexpected error submitting form:', error);
      }
    }
  };

  return (
    <div>
      <h2>Add Shop Center and Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Shop Center Name"
          value={shopCenterName}
          onChange={(e) => setShopCenterName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Product Weight"
          value={productWeight}
          onChange={(e) => setProductWeight(e.target.value)}
        />
        <input
          type="text"
          placeholder="Product Price"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
        />
        <button type="submit">Add Shop and Product</button>
      </form>
    </div>
  );
};

export default AddDataForm;
