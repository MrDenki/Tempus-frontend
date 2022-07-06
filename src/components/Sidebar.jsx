import { useEffect } from "react";

const Sidebar = () => {
  useEffect(() => {
    let menuToggle = document.querySelector(".toggle");
    let navigation = document.querySelector(".navigation");
    menuToggle.onclick = function () {
      menuToggle.classList.toggle("active");
      navigation.classList.toggle("active");    
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
        <ul>
          <li className="navigation-list active">
            <b></b>
            <b></b>
            <a href="#">
              <span className="icon">
                <ion-icon name="briefcase-outline"></ion-icon>
              </span>
              <span className="title">Tasks</span>
            </a>
          </li>
          <li className="navigation-list">
            <b></b>
            <b></b>
            <a href="#">
              <span className="icon">
                <ion-icon name="id-card-outline"></ion-icon>
              </span>
              <span className="title">Reports</span>
            </a>
          </li>
          <li className="navigation-list">
            <b></b>
            <b></b>
            <a href="#">
              <span className="icon">
                <ion-icon name="people-outline"></ion-icon>
              </span>
              <span className="title">Team</span>
            </a>
          </li>
        </ul>
      </div>
      <div className="toggle">
        <ion-icon name="menu-outline" className="open"></ion-icon>
        <ion-icon name="close-outline" className="close"></ion-icon>
      </div>
    </>
  );
};

export default Sidebar;
