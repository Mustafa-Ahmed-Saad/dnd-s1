import { useState } from "react";
import Item from "../Item/Item";
import "./ItemList.css";

const ItemList = ({ items, onOrderChange }) => {
  const [sortedItems, setSortedItems] = useState(items);

  const handleDrop = (draggedIndex, hoverIndex) => {
    // item we want to drag
    const draggedItem = sortedItems[draggedIndex];
    // copy sortedItems to create a newSortedItems
    const newSortedItems = [...sortedItems];
    // remove dragged item from newSortedItems
    newSortedItems.splice(draggedIndex, 1);
    // insert dragged to newSortedItems array at hoverIndex
    newSortedItems.splice(hoverIndex, 0, draggedItem);

    setSortedItems(newSortedItems);
    onOrderChange(
      newSortedItems.map((item, index) => ({ id: item.id, order: index + 1 }))
    );
  };

  return (
    <div className="item-list">
      {sortedItems.map((item, index) => (
        <Item key={item.id} item={item} index={index} onDrop={handleDrop} />
      ))}
    </div>
  );
};

export default ItemList;
