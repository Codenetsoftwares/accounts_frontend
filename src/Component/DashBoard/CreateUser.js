import React, { useState } from 'react';

const CreateUser = () => {
  const [formData, setFormData] = useState({
    yourName: '',
    yourSurname: '',
    yourEmail: '',
    yourPassword: '',
 
  });
  const [checkedItems, setCheckedItems] = useState([]);

 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement your form submission logic here
    // You can access the form data using 'formData'
    console.log(formData);
    console.log(checkedItems);
  };
   
  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    if (event.target.checked) {
      // Add the checkbox value to the array if it's checked
      setCheckedItems((prevCheckedItems) => [...prevCheckedItems, value]);
    } else {
      // Remove the checkbox value from the array if it's unchecked
      setCheckedItems((prevCheckedItems) =>
        prevCheckedItems.filter((item) => item !== value)
      );
    }
  };



  return (
    <div className="container  mt-5 pt-5">
      <div className="row justify-content-center">
        <div className="col-lg-9">
         
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="your-name" className="form-label">
                First name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="your-name"
                  name="yourName"
                  value={formData.yourName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="your-surname" className="form-label">
                  Last name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="your-surname"
                  name="yourSurname"
                  value={formData.yourSurname}
                  onChange={handleChange}
                  placeholder=''
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="your-email" className="form-label">
                Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="your-email"
                  name="yourEmail"
                  value={formData.yourEmail}
                  onChange={handleChange}
                  required
                />
                </div>

                <div className="col-md-6">
                <label htmlFor="your-password" className="form-label">
                password
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="your-password"
                  name="yourPassword"
                  value={formData.yourPassword}
                  onChange={handleChange}
                  required
                />
                </div>
              <div className="form-check form-switch">
  <input 
  className="form-check-input" 
  type="checkbox" 
  value="Dashboard"
  checked={checkedItems.includes('Dashboard')}
  onChange={handleCheckboxChange}
/>
  <label className="form-check-label" for="flexSwitchCheckDefault">Dashboard</label>
</div>
<div className="form-check form-switch">
  <input 
  className="form-check-input" 
  type="checkbox" 
  value="create user"
  checked={checkedItems.includes('create user')}
  onChange={handleCheckboxChange}
  
 />
  <label className="form-check-label" for="flexSwitchCheckDefault"> create user </label>
</div>
<div className="form-check form-switch">
  <input 
  className="form-check-input" 
  type="checkbox" 
  value="Alert"
  checked={checkedItems.includes('Alert')}
  onChange={handleCheckboxChange}

  />
  <label className="form-check-label" for="flexSwitchCheckDefault">Alert</label>
</div>
<div className="form-check form-switch">
  <input 
  className="form-check-input" 
  type="checkbox" 
  value="Create Transaction"
  checked={checkedItems.includes('Create Transaction')}
  onChange={handleCheckboxChange}

  />
  <label className="form-check-label" for="flexSwitchCheckDefault">Create Transaction</label>
  
</div>

               <div className="col-12">
                <div className="row">
                  <div className="col-md-6">
                    <button type="submit" className="btn btn-dark w-100 fw-bold">
                      submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
     
    </div>
    
             
              
  );
};

export default CreateUser;
