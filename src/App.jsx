import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Room from "./pages/Room";
import Landing from "./pages/Landing";

function App() {
  return (
    
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/home" element={<Home />} />
      <Route path="/room/:id" element={<Room />} />
    </Routes>
  );
}

export default App;
