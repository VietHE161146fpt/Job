import { useState } from 'react';

const useRoleApplication = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    applicant: '',
    applicantCompany: {
      companyName: '',
      companyAddress: '',
      companyPhoneNumber: '',
      companyGmail: '',
      companyTaxCode: '',
    },
    file: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      file: e.target.files[0],
    }));
  };

  const handleCompanyChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      applicantCompany: {
        ...prevFormData.applicantCompany,
        [name]: value,
      },
    }));
  };

  return {
    formData,
    setFormData, // Return setFormData so it can be used directly
    handleChange,
    handleFileChange,
    handleCompanyChange,
  };
};

export default useRoleApplication;
