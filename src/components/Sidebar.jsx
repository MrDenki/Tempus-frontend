import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signOut } from "@/store/slices/authSlice";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Sidebar = () => {
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
        list_nav[i].className = "navigation-list active";
      };
    }
  }, []);

  const dispatch = useDispatch();

  const handleClick = async () => {
    await dispatch(signOut());
    return "/sign-in";
  };

  return (
    <>
      <div className="navigation active">
        <div className="navigation-header open">
          <div className="toggle-open active">
            <ion-icon name="menu-outline" className="open"></ion-icon>
          </div>
        </div>
        <div className="navigation-container">
          <div className="navigation-body">
            <ul>
              <li className="navigation-list active">
                <Link to="/tasks">
                  <span className="icon">
                    <ion-icon name="briefcase-outline"></ion-icon>
                  </span>
                  <span className="title">Tasks</span>
                </Link>
              </li>
              <li className="navigation-list">
                <Link to="/reports">
                  <span className="icon">
                    <ion-icon name="id-card-outline"></ion-icon>
                  </span>
                  <span className="title">Reports</span>
                </Link>
              </li>
              <li className="navigation-list">
                <Link to="/team">
                  <span className="icon">
                    <ion-icon name="people-outline"></ion-icon>
                  </span>
                  <span className="title">Team</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="navigation-footer">
            <ul>
              <li className="navigation-list">
                <Link to="/account">
                  <span className="icon">
                    <ion-icon name="person-outline"></ion-icon>
                  </span>
                  <span className="title">Account</span>
                </Link>
              </li>
              <li className="navigation-list">
                <Link to="/settings">
                  <span className="icon">
                    <ion-icon name="settings-outline"></ion-icon>
                  </span>
                  <span className="title">Settings</span>
                </Link>
              </li>
              <li className="navigation-list">
                <Link to="/sign-in" onClick={handleClick}>
                  <span className="icon">
                    <ion-icon name="exit-outline"></ion-icon>
                  </span>
                  <span className="title">Sign Out</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
