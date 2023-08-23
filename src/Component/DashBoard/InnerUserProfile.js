import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faSave } from "@fortawesome/free-solid-svg-icons";
import AccountService from "../../Services/AccountService";
import { useAuth } from "../../Utils/Auth";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const InnerUserProfile = () => {
  const { id } = useParams();
  const auth = useAuth();
  console.log("User ID==>>", id);
  const [users, setUsers] = useState([]);
  const [foundObject, setFoundObject] = useState([]);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false); // State for accordion open/close
  const [isEditing, setIsEditing] = useState(false); // Track which field is being edited
  const [editedData, setEditedData] = useState({}); // Store edited data

  useEffect(() => {
    AccountService.userprofile(auth.user)
      .then((res) => {
        setUsers(res.data);
        const userWithId = res.data.find((user) => user._id === id);
        setFoundObject(userWithId);
      })
      .catch((error) => {
        // Handle error
        console.error("Error fetching user data:", error);
      });
  }, [auth, id]);
  // console.log("This is User Deatils===>>",foundObject);

  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };
  const handleToggleEdit = (e) => {
    e.preventDefault();

    setIsEditing(!isEditing);
    setEditedData([]);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const handleSave = (field) => {
    setIsEditing(false);
    setEditedData({ ...editedData, [field]: "" });
    const data = {
      firstname: editedData.firstname,
      lastname: editedData.lastname,
      email: editedData.email,
      contactnumber: editedData.contactNumber,
      websitedetail: editedData.websitedetail,
      bankDetail:{
        accountHolderName:editedData.accountHolderName,
        bankName:editedData.bankName,
        accountNumber:Number(editedData.accountNumber),
        ifscCode:editedData.ifscCode,
      }
    };
    console.log("data====>",data);
    // put Api Fetching
    // AccountService.inneruserprofile(id, data, auth.user)
    //   .then((res) => {
    //     console.log("res", res);
    //     if (res.status === 201) {
    //       toast.success("Profile updated");
    //     } else {
    //       toast.error("Failed");
    //     }
    //   })

    //   .catch((err) => {
    //     if (!err.response) {
    //       toast.error(err.message);
    //       return;
    //     }
    //   });
  };
  console.log("User Deatils",foundObject);

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        background:
          "linear-gradient(90deg, rgba(23,183,184,1) 0%, rgba(23,184,155,0.9668242296918768) 100%)",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <div className="container pt-5">
        <div className="row justify-content-center">
          <div className="col-lg-9">
            <h1
              className="text-center mb-4"
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: "bold",
                fontStyle: "italic",
                color: "black",
              }}
            >
              User Data
            </h1>
            <div className="row justify-content-center">
              <div className="card">
                <div className="card-body">
                  {foundObject && (
                    <>
                      <div className="mb-3">
                        <label className="form-label">First Name</label>
                        <input
                          name="firstname"
                          value={
                            isEditing
                              ? editedData.firstname
                              : foundObject.firstname
                          }
                          onChange={handleInputChange}
                          className="form-control"
                          disabled={!isEditing}
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Last Name</label>
                        <input
                          name="lastname"
                          value={
                            isEditing
                              ? editedData.lastname
                              : foundObject.lastname
                          }
                          onChange={handleInputChange}
                          className="form-control"
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Contact Number</label>
                        <input
                          name="contactNumber"
                          value={
                            isEditing
                              ? editedData.contactNumber
                              : foundObject.contactNumber
                          }
                          onChange={handleInputChange}
                          className="form-control"
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                          name="email"
                          value={
                            isEditing ? editedData.email : foundObject.email
                          }
                          onChange={handleInputChange}
                          className="form-control"
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">website Details</label>
                        <input
                          name="WebsiteDetails"
                          value={
                            isEditing
                              ? editedData.WebsiteDetails
                              : foundObject.WebsiteDetails
                          }
                          onChange={handleInputChange}
                          className="form-control"
                          disabled={!isEditing}
                        />
                      </div>

                      <button
                        className="btn btn-link"
                        onClick={toggleAccordion}
                      >
                        Payment Details
                      </button>
                      <Link
                        to={`/transactiondetails/${id}`}
                        className="btn btn-link"
                      >
                        Transaction Details
                      </Link>
                      {isAccordionOpen && (
                        <div className="accordion" >
                          <div className="accordion-item">
                            <h2 className="accordion-header">
                              <button
                                className="accordion-button"
                                type="button"
                                onClick={toggleAccordion}
                              >
                                Bank Details
                              </button>
                            </h2>
                            <div className="accordion-collapse collapse show">
                              <div className="accordion-body">
                              <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="bankName" className="form-label">Bank Name:</label>
              <input
                type="text"
                id="bankName"
                className="form-control"
                value={isEditing ? editedData.bankName : foundObject.bankDetail.bankName}
                disabled={!isEditing}
              />
            </div>
            <div className="form-group">
              <label htmlFor="accountNumber" className="form-label">Account Number:</label>
              <input
                type="text"
                id="accountNumber"
                className="form-control"
                value={isEditing ? editedData.accountNumber : foundObject.bankDetail.accountNumber}
                disabled={!isEditing}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="ifscCode" className="form-label">IFSC Code:</label>
              <input
                type="text"
                id="ifscCode"
                className="form-control"
                value={isEditing ? editedData.ifscCode : foundObject.bankDetail.ifscCode}
                disabled={!isEditing}
              />
            </div>
            <div className="form-group">
              <label htmlFor="accountHolderName" className="form-label">Account Holder Name:</label>
              <input
                type="text"
                id="accountHolderName"
                className="form-control"
                value={isEditing ? editedData.accountHolderName : foundObject.bankDetail.accountHolderName}
                disabled={!isEditing}
              />
            </div>
          </div>
        </div>
                                
                                
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {isEditing ? (
                        <button
                          className="btn btn-success mx-1"
                          onClick={handleSave}
                        >
                          <FontAwesomeIcon icon={faSave} /> Save
                        </button>
                      ) : (
                        <button
                          className="btn btn-info mx-1"
                          onClick={handleToggleEdit}
                        >
                          <FontAwesomeIcon icon={faEdit} /> Edit
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InnerUserProfile;
