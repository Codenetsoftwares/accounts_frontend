import React, { useEffect, useState } from "react";
import { useAuth } from "../../Utils/Auth";
import EditServices from "../../Services/EditServices";

const BankEdit = () => {
    const auth = useAuth();

    const [alert, setAlert] = useState([]);
    const [isApproved, setIsApproved] = useState();

    useEffect(() => {
      if (auth.user) {
        EditServices.ViewBankAlert(auth.user).then((res) => setAlert(res.data));
      }
    }, [auth]);
    console.log(alert);
    // console.log("alert", alert);
    // console.log("This is Auth=====> ", auth);
    const handleApprove = (e, _id) => {
      console.log(_id);
      const flag = true;

      const data = {
        isApproved: flag,
      };
      EditServices.IsBankApprove(_id, data, auth.user)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };
  return <div>BankEdit</div>;
};

export default BankEdit;
