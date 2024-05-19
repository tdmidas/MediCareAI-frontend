import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import LichKham from "./pages/LichKham/LichKham";
import Chat from "./pages/Chat/Chat";
import SucKhoe from "./pages/SucKhoe/SucKhoe";
import SucKhoeDetail from "./pages/SucKhoe/SucKhoeDetail";
import Blog from "./pages/Blog/Blog";
import Doctor from "./pages/Doctor/Doctor";
import DoctorDetail from "./pages/Doctor/DoctorDetail";
import BlogLayout from "./pages/Blog/BlogLayout";
import WriteBlog from "./pages/Blog/WriteBlog";
import ChatDetail from "./pages/Chat/ChatDetail";
import MyAppointment from "./pages/LichKham/MyAppointment";
import MyBlog from "./pages/Blog/MyBlog";
import AppointmentDetail from "./pages/LichKham/AppointmentDetail";
import HealthEvaluate from "./components/HealthEvaluate/HealthEvaluate";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/lichkham" element={<LichKham />} />
				<Route path="/me/appointment" element={<MyAppointment />} />
				<Route path="/lichkham/:slug" element={<AppointmentDetail />} />
				<Route path="/doctors" element={<Doctor />} />
				<Route path="/doctors/:slug" element={<DoctorDetail />} />
				<Route path="/chat" element={<Chat />} />
				<Route path="/chat/:slug" element={<ChatDetail />} />
				<Route path="/suckhoe" element={<SucKhoe />} />
				<Route path="/suckhoe/evaluate" element={<HealthEvaluate />} />
				<Route path="/suckhoe/:slug" element={<SucKhoeDetail />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/blog" element={<Blog />} />
				<Route path="/me/blog" element={<MyBlog />} />
				<Route path="/blog/write" element={<WriteBlog />} />
				<Route path="/blog/:slugName" element={<BlogLayout />} />
			</Routes>
		</Router>
	);
}

export default App;
