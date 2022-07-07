import { useEffect } from "react";

const Sidebar = () => {
  useEffect(() => {
    let openMenuToggle = document.querySelector(".toggle-open");
    let closeMenuToggle = document.querySelector(".toggle-close");
    let navigation = document.querySelector(".navigation");
    openMenuToggle.onclick = function () {
      openMenuToggle.classList.toggle("active");
      closeMenuToggle.classList.toggle("active");
      navigation.classList.toggle("active");
    };

    closeMenuToggle.onclick = function () {
      openMenuToggle.classList.remove("active");
      closeMenuToggle.classList.remove("active");
      navigation.classList.remove("active");
    };

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

  return (
    <>
      <div className="navigation">
        <div className="toggle-container">
          <div className="toggle-open">
            <ion-icon name="menu-outline" className="open"></ion-icon>
          </div>
          <div className="toggle-close">
            <ion-icon name="close-outline" className="close"></ion-icon>
          </div>
        </div>

        <ul>
          <li className="navigation-list active">
            <a href="#">
              <span className="icon">
                <ion-icon name="briefcase-outline"></ion-icon>
              </span>
              <span className="title">Tasks</span>
            </a>
          </li>
          <li className="navigation-list">
  
            <a href="#">
              <span className="icon">
                <ion-icon name="id-card-outline"></ion-icon>
              </span>
              <span className="title">Reports</span>
            </a>
          </li>
          <li className="navigation-list">

            <a href="#">
              <span className="icon">
                <ion-icon name="people-outline"></ion-icon>
              </span>
              <span className="title">Team</span>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
