import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../Utils/Auth";
import AccountService from "../Services/AccountService";
import { toast } from "react-toastify";
import EditTransaction from "./Modal/EditTransaction";
import Pagination from "./Pagination";

const TableTransaction = ({
  FilterData,
  purpose,
  page,
  handlePage,
  totalPage,
  totalData,
  lastPage,
  reminder,
  selectPageHandler,
  lastPageReminder,
}) => {
  console.log("totalData", totalData);
  const auth = useAuth();

  const [id, setId] = useState("");
  const [pge, setPge] = useState(1);

  const handleId = (e, id) => {
    e.preventDefault();
    setId(id);
  };

  const handleDelete = (e, id, transactionType) => {
    e.preventDefault();
    console.log(transactionType);
    switch (transactionType) {
      case "Deposit":
        AccountService.SaveTransaction({ requestId: id }, auth.user)

          .then((res) => {
            console.log(res.data);
            toast.success("Transaction delete request sent to Super Admin");
          })
          .catch((err) => {
            toast.error(err.response.data?.message);
          });
        break;

      case "Withdraw":
        AccountService.SaveTransaction({ requestId: id }, auth.user)

          .then((res) => {
            console.log(res.data);
            toast.success("Transaction delete request sent to Super Admin");
          })
          .catch((err) => {
            toast.error(err.response.data?.message);
          });
        break;

      case "Manual-Bank-Deposit":
        AccountService.SaveBankTransaction({ requestId: id }, auth.user)

          .then((res) => {
            console.log(res.data);
            toast.success(
              "Bank Transaction delete request sent to Super Admin"
            );
          })
          .catch((err) => {
            toast.error(err.response.data?.message);
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
            toast.error(err.response.data?.message);
          });
        break;

      case "Manual-Website-Deposit":
        AccountService.SaveWebsiteTransaction({ requestId: id }, auth.user)
          .then((res) => {
            console.log(res.data);
            toast.success(
              "Website Transaction delete request sent to Super Admin"
            );
          })
          .catch((err) => {
            toast.error(err.response.data?.message);
          });
        break;

      case "Manual-Website-Withdraw":
        AccountService.SaveWebsiteTransaction({ requestId: id }, auth.user)
          .then((res) => {
            console.log(res.data);
            toast.success(
              "Website Transaction delete request sent to Super Admin"
            );
          })
          .catch((err) => {
            toast.error(err.response.data?.message);
          });
        break;

      default:
    }
  };
  console.log(FilterData);
  return (
    <div>
      {/* Normal View */}
      <table className="table table-bordered  table-sm table-responsive-sm table-responsive-md table-responsive-lg table-responsive-xl">
        <thead className="table-success">
          <tr align="center" bgcolor="green" className="fs-6">
            <th scope="col fs-6" className="text-primary">
              Date & Time
            </th>
            <th scope="col text-break fs-6" className="text-primary">
              Amount
            </th>
            <th scope="col text-break fs-6" className="text-primary">
              Txn Id
            </th>
            <th scope="col text-break fs-6" className="text-primary">
              Txn Type
            </th>
            <th scope="col fs-6" className="text-primary">
              Gateway
            </th>
            <th scope="col fs-6" className="text-primary">
              Entry by
            </th>
            <th scope="col fs-6" className="text-primary">
              User Name
            </th>

            <th scope="col text-break fs-6" className="text-primary">
              Balance
            </th>

            <th scope="col text-break" className="text-primary">
              Remarks
            </th>
            {/* <th scope="col text-break" className="text-primary">
              Edit
            </th> */}
            <th scope="col text-break" className="text-primary">
              Delete
            </th>
          </tr>
        </thead>
        {/* </div> */}
        <tbody>
          {FilterData.length > 0 ? (
            <>
              {lastPageReminder ? (
                <>
                  {FilterData.slice(
                    page * 10 - 10,
                    page * 10 - 10 + reminder
                  ).map((data) => {
                    return (
                      <tr align="center" className="fs-6">
                        <td>
                          {" "}
                          {new Date(data.createdAt).toLocaleString(
                            "default"
                          )}{" "}
                        </td>
                        <td>
                          {data.amount && (
                            <p
                              className={`col fs-6  text-break ${
                                data.transactionType.includes(
                                  "Manual-Website-Withdraw"
                                ) ||
                                data.transactionType.includes(
                                  "Manual-Bank-Withdraw"
                                ) ||
                                data.transactionType === "Withdraw"
                                  ? "text-red"
                                  : "text-black"
                              }`}
                            >
                              {data.amount}
                            </p>
                          )}
                          {data.depositAmount && (
                            <p
                              className={`col fs-6 text-break ${
                                data.transactionType.includes(
                                  "Manual-Website-Withdraw"
                                ) ||
                                data.transactionType.includes(
                                  "Manual-Bank-Withdraw"
                                ) ||
                                data.transactionType === "Withdraw"
                                  ? "text-red"
                                  : "text-black"
                              }`}
                            >
                              {data.depositAmount}
                            </p>
                          )}
                          {data.withdrawAmount && (
                            <p
                              className={`col fs-6  text-break ${
                                data.transactionType.includes(
                                  "Manual-Website-Withdraw"
                                ) ||
                                data.transactionType.includes(
                                  "Manual-Bank-Withdraw"
                                ) ||
                                data.transactionType === "Withdraw"
                                  ? "text-red"
                                  : "text-black"
                              }`}
                            >
                              {data.withdrawAmount}
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
                            <p
                              className={`col fs-6 text-bold text-break ${
                                data.transactionType.includes(
                                  "Manual-Website-Withdraw"
                                ) ||
                                data.transactionType.includes(
                                  "Manual-Bank-Withdraw"
                                ) ||
                                data.transactionType === "Withdraw"
                                  ? "text-red"
                                  : "text-black"
                              }`}
                            >
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
                        <td>{data.subAdminId}</td>
                        <td>
                          {data.paymentMethod && (
                            <p className="col fs-6">{data.userName}</p>
                          )}
                          {data.depositAmount && (
                            <p className="col fs-6 text-break">N.A</p>
                          )}
                          {data.withdrawAmount && (
                            <p className="col fs-6 text-break">N.A</p>
                          )}
                        </td>
                        <td>
                          {data.balance ? (
                            <p className="col fs-6 text-break">
                              {data.balance}
                            </p>
                          ) : (
                            "N.A"
                          )}
                        </td>

                        <td>{data.remarks}</td>
                        {/* <td>
                            <button
                              type="button"
                              className="btn btn-primary"
                              data-bs-toggle="modal"
                              data-bs-target="#edittransaction"
                              onClick={(e) => {
                                handleId(e, data._id);
                              }}
                            >
                              <FontAwesomeIcon icon={faEdit} />
                            </button>
                          </td> */}
                        <td>
                          <button type="button" className="btn btn-danger">
                            {["Deposit", "Withdraw"].includes(
                              data.transactionType
                            ) && (
                              <FontAwesomeIcon
                                icon={faTrash}
                                onClick={(e) => {
                                  handleDelete(
                                    e,
                                    data.Transaction_Id,
                                    data.transactionType
                                  );
                                }}
                              />
                            )}
                            {[
                              "Manual-Website-Withdraw",
                              "Manual-Website-Deposit",
                            ].includes(data.transactionType) && (
                              <FontAwesomeIcon
                                icon={faTrash}
                                onClick={(e) => {
                                  handleDelete(
                                    e,
                                    data.WebsiteTransaction_Id,
                                    data.transactionType
                                  );
                                }}
                              />
                            )}
                            {[
                              "Manual-Bank-Withdraw",
                              "Manual-Bank-Deposit",
                            ].includes(data.transactionType) && (
                              <FontAwesomeIcon
                                icon={faTrash}
                                onClick={(e) => {
                                  handleDelete(
                                    e,
                                    data.BankTransaction_Id,
                                    data.transactionType
                                  );
                                }}
                              />
                            )}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </>
              ) : (
                <>
                  {FilterData.slice(page * 10 - 10, page * 10).map((data) => {
                    return (
                      <tr align="center" className="fs-6">
                        <td>
                          {" "}
                          {new Date(data.createdAt).toLocaleString(
                            "default"
                          )}{" "}
                        </td>
                        <td>
                          {data.amount && (
                            <p
                              className={`col fs-6 text-break ${
                                data.transactionType.includes(
                                  "Manual-Website-Withdraw"
                                ) ||
                                data.transactionType.includes(
                                  "Manual-Bank-Withdraw"
                                ) ||
                                data.transactionType === "Withdraw"
                                  ? "text-red"
                                  : "text-black"
                              }`}
                            >
                              {data.amount}
                            </p>
                          )}
                          {data.depositAmount && (
                            <p
                              className={`col fs-6  text-break ${
                                data.transactionType.includes(
                                  "Manual-Website-Withdraw"
                                ) ||
                                data.transactionType.includes(
                                  "Manual-Bank-Withdraw"
                                ) ||
                                data.transactionType === "Withdraw"
                                  ? "text-red"
                                  : "text-black"
                              }`}
                            >
                              {data.depositAmount}
                            </p>
                          )}
                          {data.withdrawAmount && (
                            <p
                              className={`col fs-6 text-break ${
                                data.transactionType.includes(
                                  "Manual-Website-Withdraw"
                                ) ||
                                data.transactionType.includes(
                                  "Manual-Bank-Withdraw"
                                ) ||
                                data.transactionType === "Withdraw"
                                  ? "text-red"
                                  : "text-black"
                              }`}
                            >
                              {data.withdrawAmount}
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
                            <p
                              className={`col fs-6 text-break text-bold ${
                                data.transactionType.includes(
                                  "Manual-Website-Withdraw"
                                ) ||
                                data.transactionType.includes(
                                  "Manual-Bank-Withdraw"
                                ) ||
                                data.transactionType === "Withdraw"
                                  ? "text-red"
                                  : "text-black"
                              }`}
                            >
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
                        <td>{data.subAdminId}</td>
                        <td>
                          {data.paymentMethod && (
                            <p className="col fs-6">{data.userName}</p>
                          )}
                          {data.depositAmount && (
                            <p className="col fs-6 text-break">N.A</p>
                          )}
                          {data.withdrawAmount && (
                            <p className="col fs-6 text-break">N.A</p>
                          )}
                        </td>

                        <td>
                          {data.balance ? (
                            <p className="col fs-6 text-break">
                              {data.balance}
                            </p>
                          ) : (
                            "N.A"
                          )}
                        </td>

                        <td>{data.remarks}</td>
                        {/* <td>
                            <button
                              type="button"
                              className="btn btn-primary"
                              data-bs-toggle="modal"
                              data-bs-target="#edittransaction"
                              onClick={(e) => {
                                handleId(e, data._id);
                              }}
                            >
                              <FontAwesomeIcon icon={faEdit} />
                            </button>
                          </td> */}
                        <td>
                          <button type="button" className="btn btn-danger">
                            {["Deposit", "Withdraw"].includes(
                              data.transactionType
                            ) && (
                              <FontAwesomeIcon
                                icon={faTrash}
                                onClick={(e) => {
                                  handleDelete(
                                    e,
                                    data.Transaction_Id,
                                    data.transactionType
                                  );
                                }}
                              />
                            )}
                            {[
                              "Manual-Website-Withdraw",
                              "Manual-Website-Deposit",
                            ].includes(data.transactionType) && (
                              <FontAwesomeIcon
                                icon={faTrash}
                                onClick={(e) => {
                                  handleDelete(
                                    e,
                                    data.WebsiteTransaction_Id,
                                    data.transactionType
                                  );
                                }}
                              />
                            )}
                            {[
                              "Manual-Bank-Withdraw",
                              "Manual-Bank-Deposit",
                            ].includes(data.transactionType) && (
                              <FontAwesomeIcon
                                icon={faTrash}
                                onClick={(e) => {
                                  handleDelete(
                                    e,
                                    data.BankTransaction_Id,
                                    data.transactionType
                                  );
                                }}
                              />
                            )}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </>
              )}
            </>
          ) : (
            <h1 className="text-center">No Transaction Found</h1>
          )}
        </tbody>
      </table>
      {FilterData.length > 0 && (
        <Pagination
          handlePage={selectPageHandler}
          page={page}
          totalPage={lastPage}
          totalData={FilterData.length}
          lastPageReminder={lastPageReminder}
          perPagePagination={10}
        />
      )}
    </div>
  );
};

export default TableTransaction;
