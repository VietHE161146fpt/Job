import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { Button } from './ui/button';
import { Alert } from './ui/alert';
import '../assets/css/ApplicationDetailModal.css';

Modal.setAppElement('#root');

const ApplicationDetailModal = ({ isOpen, onRequestClose, applicationId }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [application, setApplication] = useState(null);

  useEffect(() => {
    const fetchApplication = async () => {
      if (applicationId) {
        // console.log("Fetching application data for ID:", applicationId);
        setLoading(true);
        setError(null);
        try {
          const response = await axios.get(`http://localhost:9999/api/roleApplication/get/${applicationId}`);
          // console.log("Fetched application data:", response.data);
          setApplication(response.data.application); // Set the application state here
        } catch (err) {
          setError("Failed to fetch application details");
          console.error("Error details:", err.response ? err.response.data : err.message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchApplication();
  }, [applicationId]);

  // Debug log for checking application state
  useEffect(() => {
    // console.log("Application state in render:", application);
  }, [application]);

  const updateApplicationStatus = async (status) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.post(`http://localhost:9999/api/roleApplication/updateStatus/${applicationId}`, {
        applicationStatus: status,
        userRole: status === "accepted" ? "recruiter" : "student"
      });

      // console.log("Application updated:", response.data);
      onRequestClose();
      window.location.reload(); // Optionally reload the page to refresh the list
    } catch (err) {
      setError("Failed to update application status");
      console.error("Error details:", err.response ? err.response.data : err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!application) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Application Details"
      className="modal-container"
      overlayClassName="modal-overlay"
    >
      <div className="flex flex-col p-4 relative">
        <Button onClick={onRequestClose} variant="outline" className="absolute top-2 right-2 p-2 text-lg h-8 w-8">
          X
        </Button>
        <h2 className="text-xl font-bold mt-2">{application.title || 'No Title Available'}</h2>
        <p className="mt-1"><strong>Content:</strong> {application.content || 'No Content Available'}</p>
        
        <h3 className="mt-4 font-semibold">Company Info</h3>
        <p><strong>Company Name:</strong> {application.applicantCompany?.companyName || 'N/A'}</p>
        <p><strong>Company Address:</strong> {application.applicantCompany?.companyAddress || 'N/A'}</p>
        <p><strong>Company Phone Number:</strong> {application.applicantCompany?.companyPhoneNumber || 'N/A'}</p>
        <p><strong>Company Gmail:</strong> {application.applicantCompany?.companyGmail || 'N/A'}</p>
        <p><strong>Company Tax Code:</strong> {application.applicantCompany?.companyTaxCode || 'N/A'}</p>

        <div className="flex justify-end mt-4">
          <Button onClick={() => updateApplicationStatus('accepted')} variant="outline" className="mr-2 text-green-600">
            Accept
          </Button>
          <Button onClick={() => updateApplicationStatus('rejected')} variant="outline" className="text-red-600">
            Reject
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ApplicationDetailModal;
