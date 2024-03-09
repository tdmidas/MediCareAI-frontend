import React,{useEffect} from 'react';
import './Navigation.css';
import { Link } from 'react-router-dom';
const Navigation = () => {
  useEffect(() => {
    const list = document.querySelectorAll(".list");

    function activeLink() {
      list.forEach((item) => item.classList.remove("active"));
      this.classList.add("active");
    }

    list.forEach((item) => {
      item.addEventListener("click", activeLink);
      item.addEventListener("mouseover", activeLink);
    });

    return () => {
      list.forEach((item) => {
        item.removeEventListener("click", activeLink);
        item.removeEventListener("mouseover", activeLink);
      });
    };
  }, []); 
  return (
    <div className="navigation">
      <ul>
        <li className="list active">
          <Link to="/">
          <a href="#">
            <span className="icon">
              <ion-icon name="home-outline"></ion-icon>
            </span>
            <span className="text">Trang chủ</span>
          </a>
          </Link>
        </li>
        <li className="list">
          <Link to="/lichkham">
          <a href="#">
            <span className="icon">
              <ion-icon name="calendar-outline"></ion-icon>
            </span>
            <span className="text">Lịch khám</span>
          </a>
          </Link>
        </li>
        <li className="list">
          <Link to="/theodoi">
          <a href="#">
            <span className="icon">
              <ion-icon name="chatbox-outline"></ion-icon>
            </span>
            <span className="text">Chat</span>
          </a>
          </Link>
        </li>
        <li className="list">
          <Link to="/theodoi">
          <a href="#">
            <span className="icon">
              <ion-icon name="heart-outline"></ion-icon>
            </span>
            <span className="text">Theo dõi</span>
          </a>
          </Link>
        </li>
        <li className="list">
          <Link to="/profile">
          <a href="#">
            <span className="icon">
              <ion-icon name="person-outline"></ion-icon>
            </span>
            <span className="text">Profile</span>
          </a>
          </Link>
        </li>
        <div className="indicator"></div>
      </ul>
    </div>
  );
};

export default Navigation;
