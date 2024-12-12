import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar" 
import { CreateEvent } from "./pages/create-event";
import { DiscoverEvents } from "./pages/discover-events"; 
import { MyEvents } from "./pages/my-events";
import { MySocial } from "./pages/my-social";

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <Routes>
                    <Route path="/" element={<DiscoverEvents />} /> {/* DiscoverEvents as root */}
                    <Route path="/discover-events" element={<DiscoverEvents />} />
                    <Route path="/create-event" element={<CreateEvent />} />
                    <Route path="/my-events" element={<MyEvents />} />
                    <Route path="/my-social" element={<MySocial />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
