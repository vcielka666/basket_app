"use client";
import { useState, useEffect } from "react";
import { Product } from "../types";

interface ShowItemsProps {
  items: Product[];
  error: string;
  fetchAllItems: () => void;
}

const ShowItems = ({ items, error, fetchAllItems }: ShowItemsProps) => {
  const [filteredItem, setFilteredItem] = useState<string>("");

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
      <label htmlFor="search" className="block mb-2">Search {">>>"} </label>
      <input
        style={{backgroundColor:"rgba(0, 0, 0, 0.07)",border:"1px solid"}}
        id="search"
        name="search"
        type="text"
        value={filteredItem}
        onChange={search}
        className="search_input p-2 border border-gray-300 rounded mb-4"
        placeholder="...filter by name,price,weight"
      />
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2">SuperMarket Name</th>
            <th className="py-2">Product Name</th>
            <th className="py-2">Product Weight (g)</th>
            <th className="py-2">Product Price (czk)</th>
          </tr>
        </thead>
        <tbody>
          {showSearchedItems.map(item => (
            <tr key={item.id} className="text-center">
              <td className="py-2">{item.shopCenterName}</td>
              <td className="py-2">{item.productName}</td>
              <td className="py-2">{item.productWeight}</td>
              <td className="py-2">{item.productPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {error && <div className="text-red-500 mt-4">{error}</div>}
    </div>
  );
};

export default ShowItems;
