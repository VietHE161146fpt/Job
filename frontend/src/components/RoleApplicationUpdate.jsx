import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {Input} from './ui/input';
import {Label} from './ui/label';
import {Button} from './ui/button';
import {Textarea} from './ui/textarea';
import '../assets/css/RoleApplicationForm.css'; // Import the CSS file

const UpdateRoleApplication = () => {
  const { id: applicationId } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    applicantCompany: {
      companyName: '',
      companyAddress: '',
      companyPhoneNumber: '',
      companyGmail: '',
      companyTaxCode: '',
    },
    file: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!applicationId) return;

    const fetchApplication = async () => {
      try {
        const response = await axios.get(`http://localhost:9999/api/roleApplication/get/${applicationId}`);
        const application = response.data.application;

        setFormData({
          title: application.title || '',
          content: application.content || '',
          applicantCompany: {
            companyName: application.applicantCompany?.companyName || '',
            companyAddress: application.applicantCompany?.companyAddress || '',
            companyPhoneNumber: application.applicantCompany?.companyPhoneNumber || '',
            companyGmail: application.applicantCompany?.companyGmail || '',
            companyTaxCode: application.applicantCompany?.companyTaxCode || '',
          },
          file: null,
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching application data:', error);
        setLoading(false);
      }
    };

    fetchApplication();
  }, [applicationId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in formData.applicantCompany) {
      setFormData((prevData) => ({
        ...prevData,
        applicantCompany: {
          ...prevData.applicantCompany,
          [name]: value,
        },
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('title', formData.title);
    data.append('content', formData.content);
    data.append('applicantCompany', JSON.stringify(formData.applicantCompany));
    if (formData.file) data.append('file', formData.file);

    try {
      const response = await axios.post(`http://localhost:9999/api/roleApplication/updateDetails/${applicationId}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        alert('Application updated successfully!');
      } else {
        alert('Failed to update the application');
      }
    } catch (error) {
      console.error('Error updating application:', error);
      alert('An error occurred while updating the application');
    }
  };

  if (loading) return <p>Loading application data...</p>;

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data" className="role-application-form">
      <h2 className="text-2xl font-semibold text-center mb-4">Update Role Application</h2>
      
      <div className="form-group">
        <Label>Title</Label>
        <Input type="text" name="title" value={formData.title} onChange={handleChange} />
      </div>

      <div className="form-group">
        <Label>Content</Label>
        <Textarea name="content" value={formData.content} onChange={handleChange} />
      </div>

      <div className="form-group">
        <Label>Company Name</Label>
        <Input type="text" name="companyName" value={formData.applicantCompany.companyName} onChange={handleChange} />
      </div>

      <div className="form-group">
        <Label>Company Address</Label>
        <Input type="text" name="companyAddress" value={formData.applicantCompany.companyAddress} onChange={handleChange} />
      </div>

      <div className="form-group">
        <Label>Company Phone Number</Label>
        <Input type="text" name="companyPhoneNumber" value={formData.applicantCompany.companyPhoneNumber} onChange={handleChange} />
      </div>

      <div className="form-group">
        <Label>Company Gmail</Label>
        <Input type="email" name="companyGmail" value={formData.applicantCompany.companyGmail} onChange={handleChange} />
      </div>

      <div className="form-group">
        <Label>Company Tax Code</Label>
        <Input type="text" name="companyTaxCode" value={formData.applicantCompany.companyTaxCode} onChange={handleChange} />
      </div>

      <div className="form-group">
        <Label>Upload Company Operating License</Label>
        <Input type="file" onChange={handleFileChange} />
      </div>

      <div className="text-center mt-4">
        <Button type="submit" className="submit-button">Update Application</Button>
      </div>
    </form>
  );
};

export default UpdateRoleApplication;
