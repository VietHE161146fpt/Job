import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useRoleApplication from '../hook/useRoleApplication';
import { submitRoleApplication, resetStatus } from '../redux/roleApplicationSlice';
import "../assets/css/RoleApplicationForm.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RoleApplicationForm = () => {
  const { formData, setFormData, handleChange, handleFileChange, handleCompanyChange } = useRoleApplication();
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { submitStatus, error } = useSelector((state) => state.roleApplication);

  // Retrieve user ID from localStorage and set it in formData.applicant
  useEffect(() => {
    const rootDataString = localStorage.getItem('persist:root');
    if (rootDataString) {
      try {
        const rootData = JSON.parse(rootDataString);
        const authDataString = rootData.auth;
        const authData = JSON.parse(authDataString);
        const id = authData.user?._id;
  
        if (id) {
          setFormData((prevFormData) => ({ ...prevFormData, applicant: id }));
          const fetchData = async () => {
            try {
              const response = await axios.get(`http://localhost:9999/api/roleApplication/get`);
              console.log("Response data:", response.data);
  
              // Access nested applications array
              const applications = response.data.allRoleApplication?.[0];
  
              if (Array.isArray(applications)) {
                const matchingApplication = applications.find((app) => app.applicant.id === id);
                console.log("Matching application:", matchingApplication);
  
                // Redirect if application is found
                if (matchingApplication) {
                  navigate(`/apply/${matchingApplication.id}`);
                }
              } else {
                console.error("Unexpected data format for applications:", applications);
              }
            } catch (error) {
              console.error("Error fetching applications:", error);
            }
          };
          fetchData();
        } else {
          console.warn("No applicant ID found in localStorage");
          navigate("/login");
        }
      } catch (error) {
        console.error("Error parsing persist:root data:", error);
      }
    }
  }, [setFormData, navigate]);
  

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.content) newErrors.content = "Content is required";

    // Check if applicant is still empty
    if (!formData.applicant) {
      console.warn("Applicant ID not found in formData", formData.applicant); // Debugging line
      newErrors.applicant = "Applicant ID is required";
    }

    const company = formData.applicantCompany;
    if (!company.companyName) newErrors.companyName = "Company name is required";
    if (!company.companyAddress) newErrors.companyAddress = "Company address is required";
    if (!company.companyPhoneNumber) newErrors.companyPhoneNumber = "Company phone number is required";
    if (!company.companyGmail) newErrors.companyGmail = "Company Gmail is required";
    if (!company.companyTaxCode) newErrors.companyTaxCode = "Company tax code is required";
    if (!formData.file) newErrors.file = "Operating License Document is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(resetStatus());

    if (validateForm()) {
      const form = new FormData();
      form.append('title', formData.title || '');
      form.append('content', formData.content || '');
      form.append('applicant', formData.applicant || '');
      form.append('applicantCompany', JSON.stringify(formData.applicantCompany));
      if (formData.file) form.append('file', formData.file);

      dispatch(submitRoleApplication(form)).then(() => {
        if (submitStatus === 'succeeded') {
          setTimeout(() => {
            dispatch(resetStatus());
          }, 3000);
        }
      });
    }
  };

  // Cleanup `submitStatus` after success
  useEffect(() => {
    if (submitStatus === 'succeeded') {
      const timer = setTimeout(() => {
        dispatch(resetStatus());
      }, 3000);

      return () => clearTimeout(timer); 
    }
  }, [dispatch, submitStatus]);

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data" className="role-application-form">
      <h2 className="text-2xl font-semibold text-center mb-4">Register Company</h2>

      <div className="form-group">
        <label>Title</label>
        <input type="text" name="title" value={formData.title || ""} onChange={handleChange} required />
        {errors.title && <p className="error-text">{errors.title}</p>}
      </div>

      <div className="form-group">
        <label>Content</label>
        <textarea name="content" value={formData.content || ""} onChange={handleChange} required />
        {errors.content && <p className="error-text">{errors.content}</p>}
      </div>

      <div className="form-group">
        <input type="hidden" name="applicant" value={formData.applicant || ""} required />
        {errors.applicant && <p className="error-text">{errors.applicant}</p>}
      </div>

      <div className="form-group">
        <label>Company Name</label>
        <input type="text" name="companyName" value={formData.applicantCompany.companyName || ""} onChange={handleCompanyChange} required />
        {errors.companyName && <p className="error-text">{errors.companyName}</p>}
      </div>

      <div className="form-group">
        <label>Company Address</label>
        <input type="text" name="companyAddress" value={formData.applicantCompany.companyAddress || ""} onChange={handleCompanyChange} required />
        {errors.companyAddress && <p className="error-text">{errors.companyAddress}</p>}
      </div>

      <div className="form-group">
        <label>Company Phone Number</label>
        <input type="text" name="companyPhoneNumber" value={formData.applicantCompany.companyPhoneNumber || ""} onChange={handleCompanyChange} required />
        {errors.companyPhoneNumber && <p className="error-text">{errors.companyPhoneNumber}</p>}
      </div>

      <div className="form-group">
        <label>Company Gmail</label>
        <input type="email" name="companyGmail" value={formData.applicantCompany.companyGmail || ""} onChange={handleCompanyChange} required />
        {errors.companyGmail && <p className="error-text">{errors.companyGmail}</p>}
      </div>

      <div className="form-group">
        <label>Company Tax Code</label>
        <input type="text" name="companyTaxCode" value={formData.applicantCompany.companyTaxCode || ""} onChange={handleCompanyChange} required />
        {errors.companyTaxCode && <p className="error-text">{errors.companyTaxCode}</p>}
      </div>

      <div className="form-group">
        <label>Operating License Document</label>
        <input type="file" name="file" onChange={handleFileChange} required />
        {errors.file && <p className="error-text">{errors.file}</p>}
      </div>

      <button type="submit" className="submit-button">Submit Application</button>
      {submitStatus === 'loading' && <p className="status-text">Submitting...</p>}
      {submitStatus === 'failed' && error && <p className="error-text">Error: {error}</p>}
      {submitStatus === 'succeeded' && <p className="success-text">Application submitted successfully!</p>}
    </form>
  );
};

export default RoleApplicationForm;
