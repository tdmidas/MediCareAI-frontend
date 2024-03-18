import "./Header.css";
import { Link } from 'react-router-dom';
const Header = () => {
    return ( 
        <header class="header">
			<div class="logo">
				<a href="#" >MediCareAI</a>
			</div>
			<div class="search_box">
				<input type="text" placeholder="Tìm kiếm blog, bác sĩ,..." />
				<i class="fas fa-search"></i>
			</div>
			<div class="header-icons">
				<div class="account">
                    <Link to="/login">
					<button type="button" class="btn btn-primary">Đăng nhập</button>
                    </Link>

				</div>
			</div>
		</header>
     );
}
 
export default Header;