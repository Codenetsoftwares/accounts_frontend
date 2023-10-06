import "./App.css";
import LoginWth from "../src/Component/Login/LoginWth";
import AdminDash from "../src/Component/DashBoard/AdminDash";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import React from "react";
import { AuthProvider } from "./Utils/Auth";
import { RequireAuth } from "./Utils/RequireAuth";
import { ToastContainer } from "react-toastify";
import EditTransaction from "./Component/DashBoard/EditTransaction";
// import TopNavbar from "./Component/Sidebar/TopNavbar";
import CreateUser from "./Component/DashBoard/CreateUser";
import Alert from "./Component/DashBoard/Alert";
import ForPas from "./Component/Login/ForPas";
import Welcome from "./Component/DashBoard/Welcome";
// import BankDetails from "./Component/DashBoard/BankDetails";
import WebsiteDetails from "./Component/DashBoard/WebsiteDetails";

import AdminLayout from "./Component/Sidebar/AdminLayout";
// import GetBank from "./Component/DashBoard/GetBank";
import AdminBank from "./Component/DashBoard/AdminBank";
import UserProfile from "./Component/DashBoard/UserProfile";
import InnerUserProfile from "./Component/DashBoard/InnerUserProfile";

import TransactionDetails from "./Component/DashBoard/TransactionDetails";

import EditBank from "./Component/EditBank";
import CreateTransaction from "./Component/DashBoard/CreateTransaction";
import WebsiteStatement from "./Component/DashBoard/WebsiteStatement";
import BankStatement from "./Component/DashBoard/BankStatement";
import CreateActualUser from "./Component/DashBoard/CreateActualUser";
import CreateIntroducer from "./Component/DashBoard/CreateIntroducer";
import IntroducerProfile from "./Component/DashBoard/IntroducerProfile";
import InnerIntroducer from "./Component/DashBoard/InnerIntroducer";

import ButtonDemo from "./Component/DashBoard/ButtonDemo";
import Withdraw from "./Component/DashBoard/Withdraw";
import Deposit from "./Component/DashBoard/Deposit";
import EditWebTransaction from "./Component/DashBoard/EditWebTransaction";
import EditBnkTransaction from "./Component/DashBoard/EditBnkTransaction ";
import AdminList from "./Component/SuperAdmin/AdminList";
import AdminEditrole from "./Component/SuperAdmin/AdminEditrole";
import DuplicateDashboard from "./Component/DashBoard/DuplicateDashboard";
import SingleIntroducer from "./Component/DashBoard/SingleIntroducer";
import IntroShowPr from "./Component/DashBoard/IntroShowPr";
import EditProfileSubadmin from "./Component/SuperAdmin/EditProfileSubadmin";
import BankDelete from "./Component/DashBoard/Request/Bank/BankDelete";
import BankEdit from "./Component/DashBoard/Request/Bank/BankEdit";
import WebsiteDelete from "./Component/DashBoard/Request/Website/WebsiteDelete";
import WebsiteEdit from "./Component/DashBoard/Request/Website/WebsiteEdit";

import Login from "./Component/Login/Login";

import MainTransactionPage from "./pages/MainTransactionPage";
import IntroducerStatement from "./Component/DashBoard/IntroducerStatement";
import IntroducerAlert from "./Component/IntroducerAlert";

function App() {
  return (
    <React.Fragment>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Login />} />

            <Route path="/" element={<AdminLayout />}>
              <Route
                path="welcome"
                element={
                  <RequireAuth>
                    <Welcome />
                  </RequireAuth>
                }
              />
              <Route
                path="admindash"
                element={
                  <RequireAuth>
                    <AdminDash />
                  </RequireAuth>
                }
              />
              <Route
                path="bank"
                element={
                  <RequireAuth>
                    <AdminBank />
                  </RequireAuth>
                }
              />

              <Route
                path="website"
                element={
                  <RequireAuth>
                    <WebsiteDetails />
                  </RequireAuth>
                }
              />
              <Route
                path="introducerstatement/:id"
                element={
                  <RequireAuth>
                    <IntroducerStatement />
                  </RequireAuth>
                }
              />
              <Route
                path="websitestatement/:id"
                element={
                  <RequireAuth>
                    <WebsiteStatement />
                  </RequireAuth>
                }
              />

              <Route
                path="bankstatement/:id"
                element={
                  <RequireAuth>
                    <BankStatement />
                  </RequireAuth>
                }
              />
              <Route
                path="adminlist"
                element={
                  <RequireAuth>
                    <AdminList />
                  </RequireAuth>
                }
              />
              <Route
                path="subadminedit/:id"
                element={
                  <RequireAuth>
                    <AdminEditrole />
                  </RequireAuth>
                }
              />
              <Route
                path="userprofile"
                element={
                  <RequireAuth>
                    <UserProfile />
                  </RequireAuth>
                }
              />
              <Route
                path="maintransactionpage"
                element={
                  <RequireAuth>
                    <MainTransactionPage />
                  </RequireAuth>
                }
              />
              <Route
                path="withdraw"
                element={
                  <RequireAuth>
                    <Withdraw />
                  </RequireAuth>
                }
              />
              <Route
                path="/deposit"
                element={
                  <RequireAuth>
                    <Deposit />
                  </RequireAuth>
                }
              />

              <Route
                path="introducerprofile"
                element={
                  <RequireAuth>
                    <IntroducerProfile />
                  </RequireAuth>
                }
              />
              <Route
                path="innerintroducer/:id"
                element={
                  <RequireAuth>
                    <InnerIntroducer />
                  </RequireAuth>
                }
              />

              <Route
                path="dashboard"
                element={
                  <RequireAuth>
                    <CreateTransaction />
                  </RequireAuth>
                }
              />
              <Route
                path="createuser"
                element={
                  <RequireAuth>
                    <CreateUser />
                  </RequireAuth>
                }
              />
              <Route
                path="createactualuser"
                element={
                  <RequireAuth>
                    <CreateActualUser />
                  </RequireAuth>
                }
              />
              <Route
                path="createintroducer"
                element={
                  <RequireAuth>
                    <CreateIntroducer />
                  </RequireAuth>
                }
              />
              <Route
                path="innerprofile/:id"
                element={
                  <RequireAuth>
                    <InnerUserProfile />
                  </RequireAuth>
                }
              />
              <Route
                path="singleintroducer/:id"
                element={
                  <RequireAuth>
                    <SingleIntroducer />
                  </RequireAuth>
                }
              />

              <Route
                path="editsubadmin/:id"
                element={
                  <RequireAuth>
                    <EditProfileSubadmin />
                  </RequireAuth>
                }
              />

              <Route
                path="showpercentageintroducer"
                element={
                  <RequireAuth>
                    <IntroShowPr />
                  </RequireAuth>
                }
              />
              <Route
                path="transactiondetails/:id"
                element={
                  <RequireAuth>
                    <TransactionDetails />
                  </RequireAuth>
                }
              />
              <Route
                path="buttons"
                element={
                  <RequireAuth>
                    <ButtonDemo />
                  </RequireAuth>
                }
              />
              <Route
                path="alert"
                element={
                  <RequireAuth>
                    <Alert />
                  </RequireAuth>
                }
              />
              <Route
                path="introduceralert"
                element={
                  <RequireAuth>
                    <IntroducerAlert />
                  </RequireAuth>
                }
              />
              <Route
                path="bankDelete"
                element={
                  <RequireAuth>
                    <BankDelete />
                  </RequireAuth>
                }
              />
              <Route
                path="bankEdit"
                element={
                  <RequireAuth>
                    <BankEdit />
                  </RequireAuth>
                }
              />
              <Route
                path="websiteEdit"
                element={
                  <RequireAuth>
                    <WebsiteEdit />
                  </RequireAuth>
                }
              />
              <Route
                path="websiteDelete"
                element={
                  <RequireAuth>
                    <WebsiteDelete />
                  </RequireAuth>
                }
              />
              <Route
                path="Testing"
                element={
                  <RequireAuth>
                    <DuplicateDashboard />
                  </RequireAuth>
                }
              />
            </Route>

            {/* <Route path='admindash' element={<RequireAuth><AdminDash/></RequireAuth>}/> */}
            {/* <Route path='dashboard' element={<RequireAuth><Dashboard/></RequireAuth>}/> */}
            <Route
              path="admindash/:id"
              element={
                <RequireAuth>
                  <EditTransaction />
                </RequireAuth>
              }
            />
            <Route
              path="admindash/:id"
              element={
                <RequireAuth>
                  <EditTransaction />
                </RequireAuth>
              }
            />
            <Route
              path="editwebsitedata/:id"
              element={
                <RequireAuth>
                  <EditWebTransaction />
                </RequireAuth>
              }
            />
            <Route
              path="editbankdata/:id"
              element={
                <RequireAuth>
                  <EditBnkTransaction />
                </RequireAuth>
              }
            />
            <Route
              path="editbank/:id"
              element={
                <RequireAuth>
                  <EditBank />
                </RequireAuth>
              }
            />
            <Route path="forpas" element={<ForPas />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
      {/* <AdminDash/>
      <Dashboard/> */}
    </React.Fragment>
  );
}

export default App;
