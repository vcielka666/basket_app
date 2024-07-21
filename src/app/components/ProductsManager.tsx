"use client";
import { useState, useEffect, useCallback } from "react";
import AddDataForm from './AddDataForm';
import ShowItems from './ShowItems';
import { Product } from "../types";

const ProductsManager = () => {
  const [items, setItems] = useState<Product[]>([]);
  const [error, setError] = useState<string>("");

  const fetchAllItems = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    fetchAllItems();
  }, [fetchAllItems]);

  return (
    <div className="container mx-auto p-4">
      <AddDataForm onAdd={fetchAllItems} />
      <ShowItems items={items} error={error} fetchAllItems={fetchAllItems} />
    </div>
  );
};

export default ProductsManager;


