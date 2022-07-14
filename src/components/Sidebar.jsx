import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signOut } from "@/store/slices/authSlice";
import { FiMenu } from "react-icons/fi";
import { BiTimeFive, BiTask } from "react-icons/bi";

const Sidebar = () => {
  const sidebarState = () => {
    return localStorage.getItem("sidebar");
  };

  useEffect(() => {
    let openMenuToggle = document.querySelector(".toggle-open");
    let navigation = document.querySelector(".navigation");
    let navigationHeader = document.querySelector(".navigation-header");
    openMenuToggle.onclick = function () {
      navigation.classList.toggle("active");

      setTimeout(() => {
        openMenuToggle.classList.toggle("active");
        navigationHeader.classList.toggle("open");
      }, 400);
    };

    // closeMenuToggle.onclick = function () {
    //     openMenuToggle.classList.remove("active");
    //     navigation.classList.remove("active");
    // }

    let list_nav = document.getElementsByClassName("navigation-list");
    for (let i = 0; i < list_nav.length; i++) {
      list_nav[i].onclick = function () {
        let j = 0;
        while (j < list_nav.length) {
          list_nav[j++].className = "navigation-list";
        }
      };
    }

    // const selectedIndex = 1;
    // list_nav[selectedIndex].className = "navigation-list active";
  }, []);

  const dispatch = useDispatch();

  const handleClick = async () => {
    await dispatch(signOut());
    return "/sign-in";
  };

  return (
    <>
      <div className={["navigation", sidebarState() ? active : null].join(" ")}>
        <div className="navigation-header open">
          <div className="toggle-open active">
            <FiMenu className="toggle-open" />
          </div>
        </div>
        <div className="navigation-container">
          <div className="navigation-body">
            <ul>
              <NavLink
                to="/tasks"
                className={({ isActive }) => (isActive ? "active" : null)}
              >
                <li className="navigation-list ">
                  <span className="icon">
                    <BiTimeFive className="nav-icon first" />
                  </span>
                  <span className="title">Tasks</span>
                </li>
              </NavLink>

              <NavLink
                to="/reports"
                className={({ isActive }) => (isActive ? "active" : null)}
              >
                <li className="navigation-list">
                  <span className="icon">
                    <BiTask className="nav-icon first" />
                  </span>
                  <span className="title">Reports</span>
                </li>
              </NavLink>

              <NavLink
                to="/team"
                className={({ isActive }) => (isActive ? "active" : null)}
              >
                <li className="navigation-list">
                  <span className="icon">
                    <ion-icon name="people-outline"></ion-icon>
                  </span>
                  <span className="title">Team</span>
                </li>
              </NavLink>
            </ul>
          </div>

          <div className="navigation-footer">
            <ul>
              <NavLink
                to="/account"
                className={({ isActive }) => (isActive ? "active" : null)}
              >
                <li className="navigation-list">
                  <span className="icon">
                    <ion-icon name="person-outline"></ion-icon>
                  </span>
                  <span className="title">Account</span>
                </li>
              </NavLink>

              <NavLink
                to="/settings"
                className={({ isActive }) => (isActive ? "active" : null)}
              >
                <li className="navigation-list">
                  <span className="icon">
                    <ion-icon name="settings-outline"></ion-icon>
                  </span>
                  <span className="title">Settings</span>
                </li>
              </NavLink>

              <a onClick={handleClick}>
                <li className="navigation-list">
                  <span className="icon">
                    <ion-icon name="exit-outline"></ion-icon>
                  </span>
                  <span className="title">Sign Out</span>
                </li>
              </a>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
