import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import LichKham from "./pages/LichKham/LichKham";
import Chat from "./pages/Chat/Chat";
import TheoDoi from "./pages/TheoDoi/TheoDoi";
function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/lichkham" element={<LichKham />} />
				<Route path="/chat" element={<Chat />} />
				<Route path="/theodoi" element={<TheoDoi />} />
				<Route path="/profile" element={<Profile />} />
			</Routes>
		</Router>
	);
}
export default App;
