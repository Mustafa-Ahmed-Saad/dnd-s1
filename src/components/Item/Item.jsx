import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import "./Item.css";

const Item = ({ item, index, onDrop }) => {
  const ref = useRef(null);
  const [collected, drag] = useDrag({
    type: "ITEM",
    item: { id: item.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [collectedProps, drop] = useDrop({
    accept: "ITEM",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      onDrop(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={`item ${collected.isDragging ? "opacity-5" : ""}`}
      data-handler-id={collectedProps.handlerId}
    >
      {item.content}
    </div>
  );
};

export default Item;
