import { useState, useEffect } from "react";
import ShoppingCart from "./components/ShoppingCart";
import AddItemForm from "./components/AddItemForm";

const API = "/api/items";

function App() {
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then(setItems)
      .catch(console.error);
  }, []);

  const handleAddClick = () => {
    setEditingItem(null);
    setShowForm(true);
  };

  const handleSelect = (item) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingItem(null);
  };

  const handleSubmit = async (data) => {
    if (editingItem) {
      const res = await fetch(`${API}/${editingItem.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const updated = await res.json();
      setItems((prev) =>
        prev.map((item) => (item.id === updated.id ? updated : item))
      );
    } else {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const created = await res.json();
      setItems((prev) => [...prev, created]);
    }
    setShowForm(false);
    setEditingItem(null);
  };

  const handleRemove = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    setItems((prev) => prev.filter((item) => item.id !== id));
    if (editingItem?.id === id) {
      setShowForm(false);
      setEditingItem(null);
    }
  };

  return (
    <div className="app">
      <h1>Shopping Cart App</h1>
      <ShoppingCart
        items={items}
        selectedId={editingItem?.id}
        onSelect={handleSelect}
        onRemove={handleRemove}
        onAddClick={handleAddClick}
      />
      {showForm && (
        <AddItemForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          editingItem={editingItem}
        />
      )}
    </div>
  );
}

export default App;
