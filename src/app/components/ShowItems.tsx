"use client";
import { useState, useEffect } from "react";

interface Product {
  id: string;
  shopCenterName: string;
  productName: string;
  productWeight: number;
  productPrice: number;
}

const ShowItems = () => {
  const [items, setItems] = useState<Product[]>([]);
  const [error, setError] = useState<string>("");
  const [filteredItem, setFilteredItem] = useState<string>("");

  const fetchAllItems = async () => {
    try {
      const response = await fetch("/api/products");
      if (!response.ok) {
        throw new Error("No items found");
      }
      const data = await response.json();
      setItems(data);
      setError("");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  useEffect(() => {
    fetchAllItems();
  }, []);

  const search = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilteredItem(event.target.value);
  };

  const showSearchedItems = items.filter(item => {
    const searchTerm = filteredItem.toLowerCase();
    return (
      item.shopCenterName.toLowerCase().includes(searchTerm) ||
      item.productName.toLowerCase().includes(searchTerm) ||
      item.productWeight.toString().includes(searchTerm) ||
      item.productPrice.toString().includes(searchTerm)
    );
  });

  return (
    <div>
      <input
        id="search"
        name="search"
        type="text"
        value={filteredItem}
        onChange={search}
      />
      <table>
        <thead>
          <tr>
            <th>Shop Center Name</th>
            <th>Product Name</th>
            <th>Product Weight</th>
            <th>Product Price</th>
          </tr>
        </thead>
        <tbody>
          {showSearchedItems.map(item => (
            <tr key={item.id}>
              <td>{item.shopCenterName}</td>
              <td>{item.productName}</td>
              <td>{item.productWeight}</td>
              <td>{item.productPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {error && <div>{error}</div>}
    </div>
  );
};

export default ShowItems;
