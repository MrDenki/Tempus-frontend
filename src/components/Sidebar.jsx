import { useEffect } from "react";

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

  return (
    <>
      <div className="navigation active">
        <div className="navigation-header open">
          <div className="toggle-open active">
            <ion-icon name="menu-outline" className="open"></ion-icon>
          </div>
        </div>
        <div className="navigation-body">
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
      </div>
    </>
  );
};

export default Sidebar;
