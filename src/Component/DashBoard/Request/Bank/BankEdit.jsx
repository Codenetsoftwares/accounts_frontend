import React, { useState, useEffect } from "react";
import EditServices from "../../../../Services/EditServices";
import { useAuth } from "../../../../Utils/Auth";

const BankEdit = () => {
  const auth = useAuth();
  const [ChangeFiled, SetChangeFiled] = useState([]);
  const [EditRq, SetEditRq] = useState([]);
  useEffect(() => {
    if (auth.user) {
      EditServices.ViewBankEditRq(auth.user).then((res) => {
        const changedFieldsArray = res.data.map((item) => item.changedFields);

        SetChangeFiled(changedFieldsArray);

        SetEditRq(res.data);
      });
    }
  }, [auth]);

  console.log("ALL Request", EditRq);
  console.log("Change Request", ChangeFiled);
  const handleapprove = (ID) => {
    const flag = true;

    const data = {
      isApproved: flag,
    };

    EditServices.IsBankEditApprove(ID, data, auth.user)
      .then((response) => {
        console.log(response);
        alert("Approved");
        window.location.reload();
      })
      .catch((error) => {
        alert(error);
      });
  };

  const handleReject = (e, id) => {
    e.preventDefault();
    EditServices.IsBankDeleteReject(id, auth.user)
      .then((response) => {
        console.log(response.data);
        alert("Rejected");
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      {EditRq.length > 0 ? (
        <div className="d-flex justify-content-center">
          {EditRq.map((item, index) => (
            <div
              className="card ml-5 "
              style={{ width: "50rem" }}
              key={item.id}
            >
              <p key={index} className="ml-2 mt-2">
                <b className="text-success">All Data</b>
                <br />
                <br />
                <b>Account Holder Name</b>: {item.accountHolderName}
                <br />
                <b>Account Number</b>: {item.accountNumber}
                <br />
                <b>Bank Name</b>: {item.bankName}
                <br />
                <b>IFSC Code</b>: {item.ifscCode}
                <br />
                <b>UPI App Name</b>: {item.upiAppName}
                <br />
                <b> UPI ID</b>: {item.upiId}
                <br />
                <b>UPI Number</b>: {item.upiNumber}
                <br />
              </p>
              <hr />
              <p className="d-flex justify-content-center text-primary">
                {item.message}
              </p>
              <hr />
              <p className="ml-2">
                <b className="ml-2 text-danger">
                  {" "}
                  Here are the fields that have been changed{" "}
                </b>

                {item.hasOwnProperty("changedFields") &&
                  item.changedFields &&
                  Object.keys(item.changedFields).length > 0 && (
                    <ul>
                      {Object.keys(item.changedFields).map((key) => (
                        <li key={key}>
                          <b>{key}</b>: {item.changedFields[key]}
                        </li>
                      ))}
                    </ul>
                  )}
              </p>
              <p>
                <button
                  type="button"
                  class="btn btn-success mr-2 ml-2"
                  onClick={() => handleapprove(item.bank_id)}
                >
                  Approve
                </button>
                <button
                  class="btn btn-danger"
                  onClick={(e) => handleReject(e, item.bank_id)}
                >
                  Reject
                </button>
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div class="card">
          <div class="card-body">No Request Found</div>
        </div>
      )}
    </>
  );
};

export default BankEdit;
