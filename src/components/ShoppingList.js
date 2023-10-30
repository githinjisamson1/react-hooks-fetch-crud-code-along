import React, { useEffect, useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  // !READ
  const fetchItems = () => {
    fetch("http://localhost:4000/items")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setItems(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // !handleAddItem - CREATE/spread [...]
  const handleAddItem = (item) => {
    setItems([...items, item]);
  };

  // !handleAddToCart - UPDATE/Array.prototype.map()
  const handleAddToCart = (updatedItem) => {
    const updatedItems = items.map((item) => {
      if (item.id === updatedItem.id) {
        return updatedItem;
      } else {
        return item;
      }
    });
    setItems(updatedItems);
    // !!! setItems([...items, updatedItem]); DOES NOT UPDATE
  };

  // !handleDelete - DELETE/Array.rpototype.filter()
  const handleDelete = (data) => {
    const newItems = items.filter((item) => {
      return item.id !== data.id;
    });
    setItems(newItems);
  };

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm handleAddItem={handleAddItem} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item
            key={item.id}
            item={item}
            handleAddToCart={handleAddToCart}
            handleDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
