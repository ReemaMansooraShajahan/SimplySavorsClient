import React from 'react'

function ComponentUserProfile() {
  return (
<div className="profile-container">
<h2>Your Profile</h2>
<form className="profile-form">
  <div className="form-group">
  <img src='https://i.pinimg.com/736x/5e/51/d2/5e51d2ed9e3f2d7408667aea52881437.jpg' alt='' className='imguser'/>
  <br/><br/>
    <label htmlFor="name">Name:</label>
    <input type="text" id="name" name="name" placeholder="Your Name" />
  </div>

  <div className="form-group">
    <label htmlFor="username">Username:</label>
    <input type="text" id="username" name="username" placeholder="Your Username" />
  </div>

  <div className="form-group">
    <label htmlFor="email">Email:</label>
    <input type="email" id="email" name="email" placeholder="Your Email" />
  </div>

  <div className="form-group">
    <label htmlFor="phone">Phone Number:</label>
    <input type="tel" id="phone" name="phone" placeholder="Your Phone Number" />
  </div>

  <div className="form-group">
    <label htmlFor="password">Password:</label>
    <input type="password" id="password" name="password" placeholder="Your Password" />
  </div>

  <button type="submit">Save Changes</button>
</form>
</div>
);
};


export default ComponentUserProfile