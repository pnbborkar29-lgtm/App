import { useState, useEffect } from "react";

function AddItemForm({ onSubmit, onCancel, editingItem }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    if (editingItem) {
      setName(editingItem.name);
      setPrice(String(editingItem.price));
    } else {
      setName("");
      setPrice("");
    }
  }, [editingItem]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || price === "") return;
    onSubmit({ name: name.trim(), price: parseFloat(price) });
    if (!editingItem) {
      setName("");
      setPrice("");
    }
  };

  return (
    <div className="form-overlay">
      <h3>{editingItem ? "Edit Item" : "Add New Item"}</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="item-name">Item Name</label>
          <input
            id="item-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter item name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="item-price">Price ($)</label>
          <input
            id="item-price"
            type="number"
            step="0.01"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="0.00"
            required
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {editingItem ? "Save Changes" : "Add to Cart"}
          </button>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddItemForm;
