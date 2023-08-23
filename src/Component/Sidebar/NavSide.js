import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Utils/Auth";
import Topimg from "../../Assets/Topimgg.png";
const NavSide = () => {
  const auth = useAuth();
  const [isToggle, setIsToggle] = useState(true);
  const [isToggleCreate, setIsToggleCreate] = useState(true);
  const [isToggleDash, setIsToggleDash] = useState(true);
  const [useremail, setUserEmail] = useState([]);
  const [IsToggleTransaction, setIsToggleTransaction] = useState(true);

  useEffect(() => {
    setUserEmail(auth.user.email);
  }, [auth]);
  // console.log(useremail);

  const handleToggle = () => {
    setIsToggle(!isToggle);
  };
  const handleToggleDash = () => {
    setIsToggleDash(!isToggleDash);
  };
  const handleToggleCreate = () => {
    setIsToggleCreate(!isToggleCreate);
  };
  const handleToggleTransaction = () => {
    setIsToggleTransaction(!IsToggleTransaction);
  };
  return (
    <div>
      {/* {isTogglenav ? ( */}
      <aside
        className="main-sidebar elevation-4"
        style={{
          backgroundImage:
            "linear-gradient(270deg, rgba(254,216,216,1) 0%, rgba(255,135,98,1) 59%)",
        }}
      >
        <div className="d-flex flex-row">
          <p className="brand-link">
            <img
              src={Topimg}
              alt="AdminLTE Logo"
              className="brand-image img-circle elevation-3"
              style={{ opacity: ".8" }}
            />
            <span className="brand-text font-weight-light">
              &nbsp;Happy Wave
            </span>
          </p>
          <div
            className="fs-4 ms-4 "
            style={{ width: "15%" }}
            data-widget="pushmenu"
          >
            x
         
          </div>
        </div>

        <div className="sidebar">
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img
                src="dist/img/user2-160x160.jpg"
                className="img-circle elevation-2"
                alt="User Image"
              />
            </div>
            <div className="info">
              <p href="#" className="text-white" style={{ fontSize: "10px" }}>
                {useremail}
              </p>
            </div>
          </div>

          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item menu-open">
                {isToggleDash ? (
                  <li className="nav-item ">
                    <a
                      href="#"
                      className="nav-link active"
                      onClick={handleToggleDash}
                    >
                      <i className="nav-icon fas fa-tachometer-alt"></i>
                      <p>
                        Dashboard
                        <i className="right fas fa-angle-down"></i>
                      </p>
                    </a>
                  </li>
                ) : (
                  <li className="nav-item ">
                    <a
                      href="#"
                      className="nav-link active"
                      onClick={handleToggleDash}
                    >
                      <i className="nav-icon fas fa-tachometer-alt"></i>
                      <p>
                        Dashboard
                        <i className="right fas fa-angle-up"></i>
                      </p>
                    </a>

                    <Link to="/admindash" className="nav-link text-white">
                      <i className="far fa-circle nav-icon" />
                      <p>Transaction Details</p>
                    </Link>

                    <Link to="/dashboard" className="nav-link text-white">
                      <i className="far fa-circle nav-icon" />
                      <p>Create Transaction</p>
                    </Link>
                  </li>
                )}
              </li>
              {IsToggleTransaction ? (
                <li className="nav-item ">
                  <a className="nav-link " onClick={handleToggleTransaction}>
                    &nbsp; <i className="fa-solid fas fa-user" />
                    <p>
                      &nbsp;Transaction
                      <i className="fas fa-angle-left right" />
                    </p>
                  </a>
                </li>
              ) : (
                <li className="nav-item ">
                  <a className="nav-link " onClick={handleToggleTransaction}>
                    &nbsp;
                    <i className="fa-solid fas fa-user" />
                    <p>
                      &nbsp; Transaction
                      <i className="fas fa-chevron-down right"></i>
                    </p>
                  </a>

                  <Link to="/bank" className="nav-link text-white">
                    <i className="far fa-circle nav-icon" />
                    <p>Bank</p>
                  </Link>

                  <Link to="/website" className="nav-link text-white">
                    <i className="far fa-circle nav-icon" />
                    <p>Website</p>
                  </Link>
                </li>
              )}
              {isToggleCreate ? (
                <li className="nav-item ">
                  <a className="nav-link " onClick={handleToggleCreate}>
                    &nbsp; <i className="fa-solid fas fa-user" />
                    <p>
                      &nbsp; Create
                      <i className="fas fa-angle-left right" />
                    </p>
                  </a>
                </li>
              ) : (
                <li className="nav-item ">
                    <a className="nav-link " onClick={handleToggleCreate}>
                    &nbsp;
                    <i className="fa-solid fas fa-user" />
                    <p>
                      &nbsp; Create
                      <i className="fas fa-chevron-down right"></i>
                    </p>
                  </a>

                    <Link to="/createuser" className="nav-link text-white">
                    <i className="far fa-circle nav-icon" />
                      <p>Create SubAdmin</p>
                  </Link>

                    <Link to="/createactualuser" className="nav-link text-white">
                    <i className="far fa-circle nav-icon" />
                      <p>Create User</p>
                  </Link>
                </li>
              )}
              {/* <li className="nav-item">
                <Link to="bank" href="pages/widgets.html" className="nav-link">
                  <i className="nav-icon fas fa-university"></i>
                  <p className="text-dark">
                    Bank View
          
                  </p>
                </Link>
              </li> */}

              {/* <li className="nav-item">
                <Link
                  to="createuser"
                  href="pages/widgets.html"
                  className="nav-link"
                >
                  &nbsp;<i className="nav-icon fas fa-user-plus"></i>
                  <p className="text-dark">
                    Create SubAdmin
                  </p>
                </Link>
              </li> */}

              {/* <li className="nav-item">
                <Link
                  to="/createactualuser"
                  href="pages/widgets.html"
                  className="nav-link"
                >
                  &nbsp;<i className="nav-icon fas fa-user-plus"></i>
                  <p className="text-dark">
                    Create User
                  </p>
                </Link>
              </li> */}

              {/* <li className="nav-item">
                <Link to="website" href="#" className="nav-link">
                  <i className="nav-icon fas fa-globe"></i>
                  <p className="text-dark">
                    Website View
                  </p>
                </Link>
              </li> */}

              {isToggle ? (
                <li className="nav-item ">
                  <a className="nav-link text-white" onClick={handleToggle}>
                    &nbsp; <i className="fa-solid fas fa-user" />
                    <p>
                      &nbsp;Profile
                      <i className="fas fa-angle-left right" />
                    </p>
                  </a>
                </li>
              ) : (
                <li className="nav-item ">
                  <a className="nav-link text-white" onClick={handleToggle}>
                    &nbsp;
                    <i className="fa-solid fas fa-user" />
                    <p>
                      &nbsp; Profile
                      <i className="fas fa-chevron-down right"></i>
                    </p>
                  </a>

                  <Link to="userprofile" className="nav-link text-white">
                    <i className="far fa-circle nav-icon" />
                    <p>User Profile</p>
                  </Link>

                  <Link to="#" className="nav-link text-white">
                    <i className="far fa-circle nav-icon" />
                    <p>Introducer</p>
                  </Link>
                </li>
              )}
              <li className="nav-item">
                <Link to="alert" href="pages/widgets.html" className="nav-link">
                  &nbsp;<i className="alert-icon fas fa-bell"></i>
                  <p className="text-dark">
                    &nbsp; Edit Request
                    {/* <span className="right badge badge-danger">New</span> */}
                  </p>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
      {/* // ) : null} */}
    </div>
  );
};

export default NavSide;
