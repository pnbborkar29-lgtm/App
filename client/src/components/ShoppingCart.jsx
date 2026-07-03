function ShoppingCart({
  items,
  selectedId,
  onSelect,
  onEdit,
  onRemove,
  onAddClick,
}) {
  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="cart">
      <div className="cart-header">
        <div>
          <h2>Shopping Cart</h2>
          <p className="cart-hint">Item list — click a row to select, then edit below</p>
        </div>
        <button className="btn btn-primary" onClick={onAddClick}>
          Add Item
        </button>
      </div>

      {items.length === 0 ? (
        <p className="empty">Your cart is empty. Click "Add Item" to get started.</p>
      ) : (
        <ul className="item-list">
          {items.map((item) => (
            <li
              key={item.id}
              className={`item ${selectedId === item.id ? "selected" : ""}`}
              onClick={() => onSelect(item)}
            >
              <div className="item-info">
                <span className="item-name">{item.name}</span>
                <span className="item-price">₹{item.price.toFixed(2)}</span>
              </div>
              <div className="item-actions">
                <button
                  className="btn btn-secondary"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(item);
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove(item.id);
                  }}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {items.length > 0 && (
        <div className="total">Total: ₹{total.toFixed(2)}</div>
      )}
    </div>
  );
}

export default ShoppingCart;
