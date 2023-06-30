import React from 'react'
import { useAuth } from '../../Utils/Auth';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

export const DashboardNavbar = () => {
    const nav=useNavigate();
    const auth=useAuth();
    const handleLogout = () => {
        const response = window.confirm(
        'You are about to be logged out of this site'
      );
      if (response) {
        toast.success('Logout successfully');
        auth.logout();
        nav('/');
      }
    
    console.log('Logged out');
  };


  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03"  aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className='wellcome ml-2' >
  <a className="navbar-brand" href="#"><b>Welcome Depositer</b></a>
  </div>
  <div className="collapse navbar-collapse" id="navbarTogglerDemo03" style={{marginLeft:'100rem'}}>

      <button className="btn btn-outline-success" type="submit" onClick={handleLogout}>Logout</button>
    
  </div>
</nav>
    </div>
  )
}