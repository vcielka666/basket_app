"use client";
import { useState } from 'react';

interface AddDataFormProps {
  onAdd: () => void;
}

const AddDataForm = ({ onAdd }: AddDataFormProps) => {
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
        onAdd();
        setShopCenterName("")
        setProductName("");
        setProductWeight("");
        setProductPrice("");
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
    <div className='flex flex-col '>
      <h2 className='p-4 text-center'>Add or search for your favourite products </h2>
      <form 
        className='flex flex-wrap m-4 p-4 items-center justify-center text-center' 
        onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Super-market name"
          className="p-2 border border-gray-300 rounded mb-2"
          value={shopCenterName}
          onChange={(e) => setShopCenterName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Product name"
          className="p-2 border border-gray-300 rounded mb-2"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Product weight (grams)"
          className="p-2 border border-gray-300 rounded mb-2"
          value={productWeight}
          onChange={(e) => setProductWeight(e.target.value)}
        />
        <input
          type="text"
          placeholder="Product price (czk)"
          className="p-2 border border-gray-300 rounded mb-2"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
        />
        
      </form>
      <button className='mt-5 bg-blue-500 text-white p-2 rounded' onClick={handleSubmit}>Add to database</button>
    </div>
  );
};

export default AddDataForm;
