import './App.css';
import { useState } from 'react';

function App() {
  const [circlesPos, setCirclesPos] = useState([]);
  const [undoCircles, setUndoCircles] = useState([]);

  const handleClick = (e) => {
    const posX = e.clientX - 8, posY = e.clientY - 6;
    setCirclesPos([...circlesPos, { 'x': posX, 'y': posY }]);
  }

  const undoHandler = () => {
    let newCirclesPos = [...circlesPos];
    let lastUndoCircle = newCirclesPos.pop();
    setCirclesPos(newCirclesPos);
    setUndoCircles([...undoCircles, lastUndoCircle]);
  }

  const redoHandler = () => {
    let newUndoCircles = [...undoCircles];
    let redoCircle = newUndoCircles.pop();
    setUndoCircles(newUndoCircles);
    setCirclesPos([...circlesPos, redoCircle]);
  }

  const clearHandler = () => {
    setCirclesPos([]);
    setUndoCircles([]);
  }

  return (
    <>
      <button disabled={ circlesPos.length <= 0 } onClick={ () => undoHandler() }>Undo</button>
      <button disabled={ undoCircles.length <= 0 } onClick={ () => redoHandler() }>Redo</button>
      <button disabled={ circlesPos.length <= 0 } onClick={ () => clearHandler() }>Clear</button>
      <div className='App' onClick={ (e) => handleClick(e) }>
      { 
        circlesPos.map((circle, index) => {
          return (
            <div
              className='circle'
              key={ index }
              style={{ left: circle.x, top: circle.y }}
            />
          )
        }) 
      }
      </div>
    </>
  );
}

export default App;
