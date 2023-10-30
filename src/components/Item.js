import React from "react";

function Item({ item, handleAddToCart, handleDelete }) {
  const patchData = (item) => {
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        ...item,
        isInCart: !item.isInCart,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        handleAddToCart(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const deleteData = (item) => {
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        handleDelete(item);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button
        onClick={() => {
          patchData(item);
        }}
        className={item.isInCart ? "remove" : "add"}
      >
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button
        onClick={() => {
          deleteData(item);
        }}
        className="remove"
      >
        Delete
      </button>
    </li>
  );
}

export default Item;
