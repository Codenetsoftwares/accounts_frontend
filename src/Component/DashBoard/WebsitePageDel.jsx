import React, { useEffect, useState } from "react";
import { useAuth } from "../../Utils/Auth";
import EditServices from "../../Services/EditServices";

const WebsitePageDel = () => {
  const auth = useAuth();

  const [alert, setAlert] = useState([]);
  const [isApproved, setIsApproved] = useState();

  useEffect(() => {
    if (auth.user) {
      EditServices.ViewAlert(auth.user).then((res) => setAlert(res.data));
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
    EditServices.IsApprove(_id, data, auth.user)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return <div></div>;
};

export default WebsitePageDel;
