import ItemList from "./components/ItemList/ItemList";
import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";

function App() {
  const [items, setItems] = useState([
    { id: 1, content: "Item 1" },
    { id: 2, content: "Item 2" },
    { id: 3, content: "Item 3" },
  ]);

  const handleOrderChange = (newOrder) => {
    console.log(newOrder);
    // setItems(newOrder);
  };

  // if device support touch or not
  const isTouchDevice = () => ("ontouchstart" in window ? true : false);

  // backend based on touch support on the device
  const backendForDND = isTouchDevice() ? TouchBackend : HTML5Backend;

  return (
    <DndProvider backend={backendForDND}>
      <div className="container">
        <h1>My List</h1>
        {items ? (
          <ItemList items={items} onOrderChange={handleOrderChange} />
        ) : null}
      </div>
    </DndProvider>
  );
}

export default App;
