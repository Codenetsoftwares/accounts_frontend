import React, { useEffect, useState } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import { Dropdown, DropdownButton } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { CardFd } from "./CardFd";
import { CardFdT } from "./CardFdT";
import { useAuth } from "../../Utils/Auth";
import TransactionSercvice from "../../Services/TransactionSercvice";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import CalenderService from "../../Services/CalenderService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDeleteLeft,
  faDownLeftAndUpRightToCenter,
  faTrash,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FaFilter } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./AdminDash.css";
import TopNavbar from "../Sidebar/TopNavbar";
import AccountService from "../../Services/AccountService";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import moment from "moment";
import EditTransaction from "../Modal/EditTransaction";
import { CSVLink } from "react-csv";

const DuplicateDashboard = () => {
  const auth = useAuth();
  const nav = useNavigate();

  const [accountData, setAccountData] = useState([]);
  const [documentView, setDocumentView] = useState([]);
  const [documentFilter, setDocumentFilter] = useState([]);
  const [subAdminlist, setSubAdminlist] = useState([]);
  const [subAdmin, setSubAdmin] = useState("");
  const [bankList, setBankList] = useState([]);
  const [bank, setBank] = useState("");
  const [websiteList, setWebsiteList] = useState([]);
  const [website, setWebsite] = useState("");
  const [NormalEditData, setNormalEditData] = useState({
    Id: "",
    amount: "",
    bankName: "",
    paymentMethod: "",
    subAdminName: "",
    transactionID: "",
    transactionType: "",
    userId: "",
    websiteName: "",
    depositAmount: "",
    withdrawAmount: "",
  });
  const [select, setSelect] = useState("All");
  const [toggle, setToggle] = useState(true);
  const [startDatevalue, SetStartDatesetValue] = useState(new Date());
  const [endDatevalue, setEndDateValue] = useState(new Date());

  const test = ["transactionType", "subAdminName", "websiteName", "bankName"];

  const handleClick = (key, value) => {
    let nArr = [...documentView];
    // const originalData = [...documentView];

    if (test.includes(key)) {
      nArr = nArr.filter((item) => item[key] === value);
    }
    // if (nArr.length === 0) {
    //   nArr = originalData;
    // }
    setDocumentView(nArr);
  };

  useEffect(() => {
    TransactionSercvice.getAccountSummary(auth.user).then(
      (res) => (setDocumentView(res.data), setAccountData(res.data))
    );
  }, [auth]);
  console.log(documentView);

  const handelDate = () => {
    const sdate = moment(startDatevalue, "DD-MM-YYYY HH:mm").toDate();
    const edate = moment(endDatevalue, "DD-MM-YYYY HH:mm").toDate();
    const filteredDocuments = documentView.filter((data) => {
      const transactionDate = new Date(data.createdAt);
      return transactionDate >= sdate && transactionDate <= edate;
    });
    setDocumentFilter(filteredDocuments);
    setToggle(false);
  };

  const handleReset = () => {
    setSelect("");
    setDocumentView(accountData);
    setSubAdmin("");
    setBank("");
    setWebsite("");
    setToggle(true);
    SetStartDatesetValue("");
    setEndDateValue("");
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSelect(value);
    handleClick("transactionType", value);
  };

  const handleSubAdmin = (e) => {
    const value = e.target.value;
    setSubAdmin(value);
    handleClick("subAdminName", value);
  };

  const handleBank = (e) => {
    const value = e.target.value;
    setBank(value);
    handleClick("bankName", value);
  };

  const handleWebsite = (e) => {
    const value = e.target.value;
    setWebsite(value);
    handleClick("websiteName", value);
  };

  const handleStartDatevalue = (e) => {
    SetStartDatesetValue(moment(e).format("DD-MM-YYYY HH:mm"));
  };

  const handleEndDatevalue = (e) => {
    setEndDateValue(moment(e).format("DD-MM-YYYY HH:mm"));
  };

  useEffect(() => {
    if (auth.user) {
      TransactionSercvice.subAdminList(auth.user).then((res) => {
        setSubAdminlist(res.data);
      });
    }
  }, [auth]);

  useEffect(() => {
    if (auth.user) {
      TransactionSercvice.bankList(auth.user).then((res) => {
        setBankList(res.data);
      });
    }
  }, [auth]);

  useEffect(() => {
    AccountService.website(auth.user).then((res) => setWebsiteList(res.data));
  }, [auth]);

  const handleDelete = (e, id, transactionType) => {
    console.log(transactionType);
    console.log(id);
    switch (transactionType) {
      case "Deposit":
        AccountService.SaveTransaction({ requestId: id }, auth.user)

          .then((res) => {
            console.log(res.data);
            toast.success("Transaction delete request sent to Super Admin");
          })
          .catch((err) => {
            console.log(err);
          });
        break;
      case "Withdraw":
        AccountService.SaveTransaction({ requestId: id }, auth.user)
          .then((res) => {
            console.log(res.data);
            toast.success("Transaction delete request sent to Super Admin");
          })
          .catch((err) => {
            console.log(err);
          });
        break;

      case "Manual-Bank-Withdraw":
        AccountService.SaveBankTransaction({ requestId: id }, auth.user)

          .then((res) => {
            console.log(res.data);
            toast.success(
              "Bank Transaction delete request sent to Super Admin"
            );
          })
          .catch((err) => {
            console.log(err);
          });
        break;

      case "Manual-Bank-Deposit":
        AccountService.SaveWebsiteTransaction({ requestId: id }, auth.user)

          .then((res) => {
            console.log(res.data);

            toast.success(
              "Website Transaction delete request sent to Super Admin"
            );
          })
          .catch((err) => {
            console.log(err);
          });
        break;

      case "Manual-Website-withdraw":
        AccountService.DeleteWebsiteTransaction(id, auth.user)
          .then((res) => {
            console.log(res.data);

            toast.success(
              "Website Transaction delete request sent to Super Admin"
            );
          })
          .catch((err) => {
            console.log(err);
          });
        break;
      case "Manual-Website-Deposit":
        AccountService.DeleteTransaction({ requestId: id }, auth.user)
          .then((res) => {
            console.log(res.data);
            toast.success("Bank Transaction deleted");
          })
          .catch((err) => {
            console.log(err);
          });
        break;
      default:
      // code block
    }
  };

  const handelnormaledit = (
    e,
    id,
    amount,
    bankName,
    paymentMethod,
    subAdminName,
    transactionID,
    transactionType,
    userId,
    websiteName,
    depositAmount,
    withdrawAmount
  ) => {
    const data = {
      id,
      amount,
      bankName,
      paymentMethod,
      subAdminName,
      transactionID,
      transactionType,
      userId,
      websiteName,
      depositAmount,
      withdrawAmount,
    };
    setNormalEditData(data);
    console.log("====>>>>", NormalEditData);
  };

  return (
    <div className="main">
      {/* This is the Main Card */}
      <div
        className="card card-body rounded-1 main "
        // style={{ backgroundImage: gradient }}
      >
        <div className="d-flex mt-5 mt-5 ml-5 pt-5 justify-content-center">
          <h6 className="fw-bold text-nowrap pt-2">
            {" "}
            View <FaEye />
          </h6>
          <select
            className="form-control mx-3 w-25"
            value={select || ""}
            autoComplete="off"
            onChange={handleChange}
            style={{
              boxShadow: " 17px 15px 27px -9px rgba(0,0,0,0.41)",
              border: "0.5px solid black",
              borderRadius: "6px",
            }}
          >
            <option className="d-flex" value="All">
              <b>All</b>
            </option>
            <option className="d-flex" value="Deposit">
              <b>Deposit</b>
            </option>
            <option className="d-flex" value="Withdraw">
              <b>Withdraw</b>
            </option>
            <option className="d-flex" value="Manual-Bank-Deposit">
              <b>Manual Bank Deposit</b>
            </option>{" "}
            <option className="d-flex" value="Manual-Bank-Withdraw">
              <b>Manual Bank Withdraw</b>
            </option>
            <option className="d-flex" value="Manual-Website-Deposit">
              <b>Manual Website Deposit</b>
            </option>{" "}
            <option className="d-flex" value="Manual-Website-Withdraw">
              <b>Manual Website Withdraw</b>
            </option>
          </select>
        </div>

        <div className="d-flex pt-3 justify-content-center">
          <h6 className="fw-bold text-nowrap pt-2"> SubAdminlist</h6>
          <select
            className="form-control mx-3 w-25"
            value={subAdmin || ""}
            autoComplete="off"
            onChange={handleSubAdmin}
            style={{
              boxShadow: " 17px 15px 27px -9px rgba(0,0,0,0.41)",
              border: "0.5px solid black",
              borderRadius: "6px",
            }}
            required
          >
            <option selected>Select subAdmin</option>
            {subAdminlist.map((data) => {
              return (
                <option key={data._id} value={data.firstname}>
                  {data.firstname}
                </option>
              );
            })}
          </select>
        </div>
        <div className="d-flex pt-3 justify-content-center">
          <h6 className="fw-bold text-nowrap pt-2"> BankNameList</h6>
          <select
            className="form-control mx-3 w-25"
            value={bank || ""}
            autoComplete="off"
            onChange={handleBank}
            style={{
              boxShadow: " 17px 15px 27px -9px rgba(0,0,0,0.41)",
              border: "0.5px solid black",
              borderRadius: "6px",
            }}
            required
          >
            <option selected>Select Bank</option>
            {bankList.map((data) => {
              return (
                <option key={data._id} value={data.bankName}>
                  {data.bankName}
                </option>
              );
            })}
          </select>
        </div>
        <div className="d-flex pt-3 justify-content-center">
          <h6 className="fw-bold text-nowrap pt-2"> WebsitesList</h6>
          <select
            className="form-control mx-3 w-25"
            value={website || ""}
            autoComplete="off"
            onChange={handleWebsite}
            style={{
              boxShadow: " 17px 15px 27px -9px rgba(0,0,0,0.41)",
              border: "0.5px solid black",
              borderRadius: "6px",
            }}
            required
          >
            <option selected>Select website</option>
            {websiteList.map((data) => {
              return (
                <option key={data._id} value={data.websiteName}>
                  {data.websiteName}
                </option>
              );
            })}
          </select>
        </div>
        {/* <div className="d-flex mt-2 pl-5 justify-content-center">
         

          <div className="d-flex gap-2 justify-content-between w-25 ms-4">
            <label className="form-label">
              Start date
            </label>
            <Datetime value={startDatevalue}
              onChange={handleStartDatevalue}
              dateFormat="DD-MM-YYYY"
              timeFormat="mm:HH" />
            <label className="form-label">
              Date date
            </label>
            <Datetime value={endDatevalue}
              onChange={handleEndDatevalue}
              dateFormat="DD-MM-YYYY"
              timeFormat="mm-HH" />
            <div>
              {" "}
              <button
                type="button"
                className="btn btn-dark"
                style={{ boxShadow: "17px 15px 27px -9px rgba(0, 0, 0, 0.41)" }}
                onClick={handelDate}
              >
                Filter
              </button>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-dark"
                style={{ boxShadow: "17px 15px 27px -9px rgba(0, 0, 0, 0.41)" }}
                onClick={handleReset}
              >
                Reset
              </button>
            </div>
          </div>
        </div> */}
        <div className="d-flex pt-3 justify-content-center">
          <h6 className="fw-bold text-nowrap pt-2"> Start Date</h6>
          <Datetime
            value={startDatevalue}
            onChange={handleStartDatevalue}
            dateFormat="DD-MM-YYYY"
            timeFormat="HH:mm"
          />
        </div>
        <div className="d-flex pt-3 justify-content-center">
          <h6 className="fw-bold text-nowrap pt-2"> End Date</h6>
          <Datetime
            value={endDatevalue}
            onChange={handleEndDatevalue}
            dateFormat="DD-MM-YYYY"
            timeFormat="HH:mm"
          />
        </div>
        <div className="d-flex pt-3 justify-content-center">
          <div className="mx-2">
            <button
              type="button"
              className="btn btn-dark"
              style={{ boxShadow: "17px 15px 27px -9px rgba(0, 0, 0, 0.41)" }}
              onClick={handelDate}
            >
              Filter
            </button>
          </div>
          <div className="mx-2">
            <button
              type="button"
              className="btn btn-dark"
              style={{ boxShadow: "17px 15px 27px -9px rgba(0, 0, 0, 0.41)" }}
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
          {toggle ? (
            <div className="mx-2">
              <CSVLink data={documentView} className="btn btn-success">
                Download Data
              </CSVLink>
            </div>
          ) : (
            <div className="mx-2">
              <CSVLink data={documentFilter} className="btn btn-success">
                Download Filter Data
              </CSVLink>
            </div>
          )}
        </div>
      </div>

      {toggle ? (
        <small>
          {/* Normal View */}
          <table class="table table-bordered  table-sm table-responsive-sm table-responsive-md table-responsive-lg table-responsive-xl w-auto">
            {/* This is for Deposit Card Normal View */}
            {/* <div
            className="card  rounded-2 mb-2"
            style={{
              boxShadow: "26px -13px 32px -15px rgba(29,29,31,0.68)",
              backgroundImage:
                "linear-gradient(90deg, rgba(60,251,165,1) 0%, rgba(171,246,241,1) 50%, rgba(60,251,165,1) 100%)",
            }}
          > */}
            <thead className="table-success">
              <tr align="center" bgcolor="green" className="fs-6">
                <th scope="col fs-6" className="text-primary">
                  Date <br />&<br /> Time
                </th>
                <th scope="col text-break fs-6" className="text-primary">
                  Amount
                </th>
                <th scope="col text-break fs-6" className="text-primary">
                  Transaction Id
                </th>
                <th scope="col text-break fs-6" className="text-primary">
                  Transaction Type
                </th>
                <th scope="col fs-6" className="text-primary">
                  Gateway
                </th>
                <th scope="col fs-6" className="text-primary">
                  CreatedBy
                </th>
                <th scope="col fs-6" className="text-primary">
                  User Id
                </th>
                <th scope="col" className="text-primary">
                  Bank
                </th>
                <th scope="col" className="text-primary">
                  Website
                </th>
                <th scope="col text-break fs-6" className="text-primary">
                  Before Bank Balance
                </th>
                <th scope="col text-break fs-6" className="text-primary">
                  Current Bank Balance
                </th>
                <th scope="col text-break fs-6" className="text-primary">
                  Before Website Balance
                </th>
                <th scope="col text-break fs-6" className="text-primary">
                  Current Website Balance
                </th>
                <th scope="col text-break fs-6" className="text-primary">
                  Before Balance
                </th>
                <th scope="col text-break fs-6" className="text-primary">
                  Current Balance
                </th>
                <th scope="col text-break" className="text-primary">
                  Remarks
                </th>
                <th scope="col text-break" className="text-primary">
                  Edit
                </th>
                <th scope="col text-break" className="text-primary">
                  Delete
                </th>
              </tr>
            </thead>
            {/* </div> */}
            <tbody>
              {documentView.length > 0 ? (
                documentView.map((data, i) => {
                  return (
                    <tr align="center" className="fs-6">
                      <td>
                        {" "}
                        {new Date(data.createdAt).toLocaleString(
                          "default"
                        )}{" "}
                      </td>
                      <td className="text-break">
                        {data.amount && (
                          <p className="col fs-6">₹&nbsp;{data.amount}</p>
                        )}
                        {data.depositAmount && (
                          <p className="col fs-6">
                            ₹&nbsp;{data.depositAmount}
                          </p>
                        )}
                        {data.withdrawAmount && (
                          <p className="col fs-6">
                            ₹&nbsp;{data.withdrawAmount}
                          </p>
                        )}
                      </td>
                      <td>
                        {data.transactionID && (
                          <p className="col fs-6 text-break">
                            {data.transactionID}
                          </p>
                        )}
                        {data.depositAmount && (
                          <p className="col fs-6 text-break">N.A</p>
                        )}
                        {data.withdrawAmount && (
                          <p className="col fs-6 text-break">N.A</p>
                        )}
                      </td>
                      <td>
                        {data.transactionType && (
                          <p className="col fs-6 text-break">
                            {data.transactionType}
                          </p>
                        )}
                      </td>
                      <td>
                        {data.paymentMethod && (
                          <p className="col fs-6">{data.paymentMethod}</p>
                        )}
                        {data.depositAmount && (
                          <p className="col fs-6 text-break">N.A</p>
                        )}
                        {data.withdrawAmount && (
                          <p className="col fs-6 text-break">N.A</p>
                        )}
                      </td>
                      <td>{data.subAdminName}</td>
                      <td>
                        {data.paymentMethod && (
                          <p className="col fs-6">{data.userId}</p>
                        )}
                        {data.depositAmount && (
                          <p className="col fs-6 text-break">N.A</p>
                        )}
                        {data.withdrawAmount && (
                          <p className="col fs-6 text-break">N.A</p>
                        )}
                      </td>
                      <td>
                        <p className="col fs-6">
                          {data.bankName ? data.bankName : "N.A"}
                        </p>
                      </td>
                      <td>
                        <p className="col fs-6">
                          {data.websiteName ? data.websiteName : "N.A"}
                        </p>
                      </td>
                      <td>
                        {data.beforeBalanceBankWithdraw ? (
                          <p className="col fs-6">
                            {data.beforeBalanceBankWithdraw && (
                              <p className="col fs-6 text-break">
                                ₹&nbsp; {data.beforeBalanceBankWithdraw}
                              </p>
                            )}
                            {data.beforeBalanceBankDeposit && (
                              <p className="col fs-6 text-break">
                                ₹&nbsp; {data.beforeBalanceBankDeposit}
                              </p>
                            )}
                          </p>
                        ) : (
                          "N.A"
                        )}
                      </td>
                      <td>
                        {data.beforeBalanceBankWithdraw ? (
                          <p className="col fs-6">
                            {data.currentBalanceBankWithdraw && (
                              <p className="col fs-6 text-break">
                                ₹&nbsp; {data.currentBalanceBankWithdraw}
                              </p>
                            )}
                            {data.currentBalanceBankDeposit && (
                              <p className="col fs-6 text-break">
                                ₹&nbsp; {data.currentBalanceBankDeposit}
                              </p>
                            )}
                          </p>
                        ) : (
                          "N.A"
                        )}
                      </td>
                      <td>
                        {data.beforeBalanceBankWithdraw ? (
                          <p className="col fs-6">
                            {data.beforeBalanceWebsiteWithdraw && (
                              <p className="col fs-6 text-break">
                                ₹&nbsp; {data.beforeBalanceWebsiteWithdraw}
                              </p>
                            )}
                            {data.beforeBalanceWebsiteDeposit && (
                              <p className="col fs-6 text-break">
                                ₹&nbsp; {data.beforeBalanceWebsiteDeposit}
                              </p>
                            )}
                          </p>
                        ) : (
                          "N.A"
                        )}
                      </td>
                      <td>
                        {data.beforeBalanceBankWithdraw ? (
                          <p className="col fs-6">
                            {data.currentBalanceWebsiteWithdraw && (
                              <p className="col fs-6 text-break">
                                ₹&nbsp; {data.currentBalanceWebsiteWithdraw}
                              </p>
                            )}
                            {data.currentBalanceWebsiteDeposit && (
                              <p className="col fs-6 text-break">
                                ₹&nbsp; {data.currentBalanceWebsiteDeposit}
                              </p>
                            )}
                          </p>
                        ) : (
                          "N.A"
                        )}
                      </td>
                      <td>
                        {data.beforeBalance ? (
                          <p className="col fs-6">
                            {data.beforeBalance ? data.beforeBalance : "N.A"}
                          </p>
                        ) : (
                          "N.A"
                        )}
                      </td>
                      <td>
                        {data.currentBalance ? (
                          <p className="col fs-6">
                            {data.currentBalance ? data.currentBalance : "N.A"}
                          </p>
                        ) : (
                          "N.A"
                        )}
                      </td>

                      <td>{data.remarks}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-primary"
                          data-bs-toggle="modal"
                          data-bs-target="#edittransaction"
                          onClick={(e) => {
                            handelnormaledit(
                              e,
                              data._id,
                              data.amount,
                              data.bankName,
                              data.paymentMethod,
                              data.subAdminName,
                              data.transactionID,
                              data.transactionType,
                              data.userId,
                              data.websiteName,
                              data.depositAmount,
                              data.withdrawAmount
                            );
                          }}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                      </td>
                      <td>
                        <button type="button" className="btn btn-danger">
                          <FontAwesomeIcon
                            icon={faTrash}
                            onClick={(e) => {
                              handleDelete(e, data._id, data.transactionType);
                            }}
                          />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <h1 className="text-center">No Transaction Found</h1>
              )}
            </tbody>
          </table>
        </small>
      ) : (
        //Filter View
        <small>
          <table class="table table-bordered  table-sm table-responsive-sm table-responsive-md table-responsive-lg table-responsive-xl w-auto">
            {/* This is for Deposit Card Normal View */}
            {/* <div
            className="card  rounded-2 mb-2"
            style={{
              boxShadow: "26px -13px 32px -15px rgba(29,29,31,0.68)",
              backgroundImage:
                "linear-gradient(90deg, rgba(60,251,165,1) 0%, rgba(171,246,241,1) 50%, rgba(60,251,165,1) 100%)",
            }}
          > */}
            <thead className="table-success">
              <tr align="center" bgcolor="green" className="fs-6">
                <th scope="col fs-6" className="text-primary">
                  Date <br />&<br /> Time
                </th>
                <th scope="col text-break fs-6" className="text-primary">
                  Amount
                </th>
                <th scope="col text-break fs-6" className="text-primary">
                  Transaction Id
                </th>
                <th scope="col text-break fs-6" className="text-primary">
                  Transaction Type
                </th>
                <th scope="col fs-6" className="text-primary">
                  Gateway
                </th>
                <th scope="col fs-6" className="text-primary">
                  CreatedBy
                </th>
                <th scope="col fs-6" className="text-primary">
                  User Id
                </th>
                <th scope="col" className="text-primary">
                  Bank
                </th>
                <th scope="col" className="text-primary">
                  Website
                </th>
                <th scope="col text-break fs-6" className="text-primary">
                  Before Bank Balance
                </th>
                <th scope="col text-break fs-6" className="text-primary">
                  Current Bank Balance
                </th>
                <th scope="col text-break fs-6" className="text-primary">
                  Before Website Balance
                </th>
                <th scope="col text-break fs-6" className="text-primary">
                  Current Website Balance
                </th>
                <th scope="col text-break fs-6" className="text-primary">
                  Before Balance
                </th>
                <th scope="col text-break fs-6" className="text-primary">
                  Current Balance
                </th>
                <th scope="col text-break" className="text-primary">
                  Remarks
                </th>
                <th scope="col text-break" className="text-primary">
                  Edit
                </th>
                <th scope="col text-break" className="text-primary">
                  Delete
                </th>
              </tr>
            </thead>
            {/* </div> */}
            <tbody>
              {documentFilter.length > 0 ? (
                documentFilter.map((data, i) => {
                  return (
                    <tr align="center" className="fs-6">
                      <td>
                        {" "}
                        {new Date(data.createdAt).toLocaleString(
                          "default"
                        )}{" "}
                      </td>
                      <td className="text-break">
                        {data.amount && (
                          <p className="col fs-6">₹&nbsp;{data.amount}</p>
                        )}
                        {data.depositAmount && (
                          <p className="col fs-6">
                            ₹&nbsp;{data.depositAmount}
                          </p>
                        )}
                        {data.withdrawAmount && (
                          <p className="col fs-6">
                            ₹&nbsp;{data.withdrawAmount}
                          </p>
                        )}
                      </td>
                      <td>
                        {data.transactionID && (
                          <p className="col fs-6 text-break">
                            {data.transactionID}
                          </p>
                        )}
                        {data.depositAmount && (
                          <p className="col fs-6 text-break">N.A</p>
                        )}
                        {data.withdrawAmount && (
                          <p className="col fs-6 text-break">N.A</p>
                        )}
                      </td>
                      <td>
                        {data.transactionType && (
                          <p className="col fs-6 text-break">
                            {data.transactionType}
                          </p>
                        )}
                      </td>
                      <td>
                        {data.paymentMethod && (
                          <p className="col fs-6">{data.paymentMethod}</p>
                        )}
                        {data.depositAmount && (
                          <p className="col fs-6 text-break">N.A</p>
                        )}
                        {data.withdrawAmount && (
                          <p className="col fs-6 text-break">N.A</p>
                        )}
                      </td>
                      <td>{data.subAdminName}</td>
                      <td>
                        {data.paymentMethod && (
                          <p className="col fs-6">{data.userId}</p>
                        )}
                        {data.depositAmount && (
                          <p className="col fs-6 text-break">N.A</p>
                        )}
                        {data.withdrawAmount && (
                          <p className="col fs-6 text-break">N.A</p>
                        )}
                      </td>
                      <td>
                        <p className="col fs-6">
                          {data.bankName ? data.bankName : "N.A"}
                        </p>
                      </td>
                      <td>
                        <p className="col fs-6">
                          {data.websiteName ? data.websiteName : "N.A"}
                        </p>
                      </td>
                      <td>
                        {data.beforeBalanceBankWithdraw ? (
                          <p className="col fs-6">
                            {data.beforeBalanceBankWithdraw && (
                              <p className="col fs-6 text-break">
                                ₹&nbsp; {data.beforeBalanceBankWithdraw}
                              </p>
                            )}
                            {data.beforeBalanceBankDeposit && (
                              <p className="col fs-6 text-break">
                                ₹&nbsp; {data.beforeBalanceBankDeposit}
                              </p>
                            )}
                          </p>
                        ) : (
                          "N.A"
                        )}
                      </td>
                      <td>
                        {data.beforeBalanceBankWithdraw ? (
                          <p className="col fs-6">
                            {data.currentBalanceBankWithdraw && (
                              <p className="col fs-6 text-break">
                                ₹&nbsp; {data.currentBalanceBankWithdraw}
                              </p>
                            )}
                            {data.currentBalanceBankDeposit && (
                              <p className="col fs-6 text-break">
                                ₹&nbsp; {data.currentBalanceBankDeposit}
                              </p>
                            )}
                          </p>
                        ) : (
                          "N.A"
                        )}
                      </td>
                      <td>
                        {data.beforeBalanceBankWithdraw ? (
                          <p className="col fs-6">
                            {data.beforeBalanceWebsiteWithdraw && (
                              <p className="col fs-6 text-break">
                                ₹&nbsp; {data.beforeBalanceWebsiteWithdraw}
                              </p>
                            )}
                            {data.beforeBalanceWebsiteDeposit && (
                              <p className="col fs-6 text-break">
                                ₹&nbsp; {data.beforeBalanceWebsiteDeposit}
                              </p>
                            )}
                          </p>
                        ) : (
                          "N.A"
                        )}
                      </td>
                      <td>
                        {data.beforeBalanceBankWithdraw ? (
                          <p className="col fs-6">
                            {data.currentBalanceWebsiteWithdraw && (
                              <p className="col fs-6 text-break">
                                ₹&nbsp; {data.currentBalanceWebsiteWithdraw}
                              </p>
                            )}
                            {data.currentBalanceWebsiteDeposit && (
                              <p className="col fs-6 text-break">
                                ₹&nbsp; {data.currentBalanceWebsiteDeposit}
                              </p>
                            )}
                          </p>
                        ) : (
                          "N.A"
                        )}
                      </td>
                      <td>
                        {data.beforeBalance ? (
                          <p className="col fs-6">
                            {data.beforeBalance ? data.beforeBalance : "N.A"}
                          </p>
                        ) : (
                          "N.A"
                        )}
                      </td>
                      <td>
                        {data.currentBalance ? (
                          <p className="col fs-6">
                            {data.currentBalance ? data.currentBalance : "N.A"}
                          </p>
                        ) : (
                          "N.A"
                        )}
                      </td>

                      <td>{data.remarks}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-primary"
                          data-bs-toggle="modal"
                          data-bs-target="#edittransaction"
                          onClick={(e) => {
                            handelnormaledit(
                              e,
                              data._id,
                              data.amount,
                              data.bankName,
                              data.paymentMethod,
                              data.subAdminName,
                              data.transactionID,
                              data.transactionType,
                              data.userId,
                              data.websiteName,
                              data.depositAmount,
                              data.withdrawAmount
                            );
                          }}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                      </td>
                      <td>
                        <button type="button" className="btn btn-danger">
                          <FontAwesomeIcon
                            icon={faTrash}
                            onClick={(e) => {
                              handleDelete(e, data._id, data.transactionType);
                            }}
                          />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <h1 className="text-center">No Transaction Found</h1>
              )}
            </tbody>
          </table>
        </small>
      )}
      <EditTransaction Data={NormalEditData} />
    </div>
  );
};

export default DuplicateDashboard;