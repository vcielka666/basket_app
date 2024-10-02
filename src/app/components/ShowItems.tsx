"use client";
import { useState } from "react";
import { Product } from "../types";
import ImageComponent from "./ImageComponent";

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

  // Function to handle delete request with password
  const handleDelete = async (id: string) => {
    const password = prompt("Please enter the password to delete this item:");
    
    if (password === "moon") {
      try {
        const res = await fetch(`/api/products/${id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          fetchAllItems(); // Refresh the list after deleting the item
        } else {
          console.error("Failed to delete item");
        }
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    } else {
      alert("Incorrect password. You cannot delete this item.");
    }
  };

  const showSearchedItems = items.filter((item) => {
    const searchTerm = filteredItem.toLowerCase();
    const searchWeight = parseFloat(searchTerm);

    if (!isNaN(searchWeight) && searchWeight > 0) {
      const productWeight = item.productWeight;
      if (searchWeight % productWeight === 0) {
        return true;
      }
    }

    return (
      item.shopCenterName.toLowerCase().includes(searchTerm) ||
      item.productName.toLowerCase().includes(searchTerm) ||
      item.productWeight.toString().includes(searchTerm) ||
      item.productPrice.toString().includes(searchTerm)
    );
  });

  return (
    <div>
      <label htmlFor="search" className="block mb-2">
        Search {">>>"}
      </label>
      <input
        style={{ backgroundColor: "rgba(0, 0, 0, 0.07)", border: "1px solid" }}
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
            <th className="py-2">Image</th>
            <th className="py-2">Times in searched weight</th>
          </tr>
        </thead>
        <tbody>
          {showSearchedItems.map((item) => {
            const searchWeight = parseFloat(filteredItem);
            const productWeight = item.productWeight;
            const timesFit = !isNaN(searchWeight)
              ? Math.floor(searchWeight / productWeight)
              : null;

            return (
              <tr key={item.id} className="text-center">
                <td className="py-2">
                  <button
                    onClick={() => handleDelete(item.id)}
                    style={{
                      position: "absolute",
                      left: "0",
                      fontSize: "8px",
                      backgroundColor: "red",
                    }}
                  >
                    X
                  </button>
                  {item.shopCenterName}
                </td>
                <td className="py-2">{item.productName}</td>
                <td className="py-2">{item.productWeight}g</td>
                <td className="py-2">{item.productPrice} czk</td>
                <td className="py-2">
                  <ImageComponent
                    imageUrl={item.imageUrl ?? ""}
                    altText={item.productName}
                  />
                </td>
                <td className="py-2">
                  {timesFit && timesFit > 0
                    ? `${timesFit}x`
                    : "-"}
                </td>
                
              </tr>
            );
          })}
        </tbody>
      </table>
      {error && <div className="text-red-500 mt-4">{error}</div>}
    </div>
  );
};

export default ShowItems;
