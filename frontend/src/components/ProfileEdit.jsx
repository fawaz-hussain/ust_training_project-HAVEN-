import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import api from '../api';

const ProfileEdit = () => {
  const adminData = useSelector((state) => state.user_data.user);
  // Initial state
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(adminData, "123");
        const response = await api.get(`api/admin/useroperations/${adminData.user.id}/`);
        const event = response.data;
        console.log(event, "456");
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [adminData]);

  const [formData, setFormData] = useState({
    first_name: adminData.user.first_name,
    last_name: adminData.user.last_name,
    phonenumber: adminData.phonenumber,
    email: adminData.user.email,
    username: adminData.user.username,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const updatedData = {};

    if (formData.first_name !== adminData.user.first_name) updatedData.first_name = formData.first_name;
    if (formData.last_name !== adminData.user.last_name) updatedData.last_name = formData.last_name;
    if (formData.username !== adminData.user.username) updatedData.username = formData.username;
    if (formData.email !== adminData.user.email) updatedData.email = formData.email;
    if (formData.phonenumber !== adminData.phonenumber) updatedData.phonenumber = formData.phonenumber;

    if (Object.keys(updatedData).length === 0) {
      alert("No changes detected!");
      return;
    }

    const requestBody = {};

    if (updatedData.first_name || updatedData.last_name || updatedData.username || updatedData.email) {
      requestBody.user = {};
      if (updatedData.first_name) requestBody.user.first_name = updatedData.first_name;
      if (updatedData.last_name) requestBody.user.last_name = updatedData.last_name;
      if (updatedData.username) requestBody.user.username = updatedData.username;
      if (updatedData.email) requestBody.user.email = updatedData.email;
    }

    if (updatedData.phonenumber) {
      requestBody.phonenumber = updatedData.phonenumber;
    }

    try {
      const response = await api.patch(`api/admin/useroperations/${adminData.user.id}/`, requestBody);
      console.log("Profile updated successfully:", response.data);
      alert("Profile saved!");
    } catch (error) {
      console.error("Error saving profile:", error.response || error);
      alert("Failed to save profile!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 via-teal-50 to-pink-50">
      <div className="bg-white p-10 rounded-xl shadow-xl w-full max-w-lg space-y-8">
        <h2 className="text-4xl font-semibold text-center text-gray-800 mb-6">Edit Profile</h2>
        <form onSubmit={handleSave} className="space-y-6">
          {/* First Name */}
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-lg font-medium text-gray-700 mb-2">First Name</label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              placeholder="Enter your first name"
              required
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
            />
          </div>

          {/* Last Name */}
          <div className="mb-4">
            <label htmlFor="lastName" className="block text-lg font-medium text-gray-700 mb-2">Last Name</label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              placeholder="Enter your last name"
              required
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
            />
          </div>

          {/* Phone Number */}
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block text-lg font-medium text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              id="phonenumber"
              name="phonenumber"
              value={formData.phonenumber}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
            />
          </div>

          {/* Username */}
          <div className="mb-6">
            <label htmlFor="username" className="block text-lg font-medium text-gray-700 mb-2">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
            />
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white text-lg font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileEdit;
