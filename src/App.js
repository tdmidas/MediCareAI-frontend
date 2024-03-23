import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import LichKham from "./pages/LichKham/LichKham";
import Chat from "./pages/Chat/Chat";
import SucKhoe from "./pages/SucKhoe/SucKhoe";
import Blog from "./pages/Blog/Blog";
import Doctor from "./pages/Doctor/Doctor";
function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/lichkham" element={<LichKham />} />
				<Route path="/doctor" element={<Doctor />} />
				<Route path="/chat" element={<Chat />} />
				<Route path="/suckhoe" element={<SucKhoe />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/blog" element={<Blog />} />
			</Routes>
		</Router>
	);
}
export default App;
