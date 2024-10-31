import React, { useState } from 'react';
import ApplicationDetailModal from './ApplicationDetail';
import useGetAllApplication from '../hook/useGetAllRoleApplication';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from './ui/table';

const ApplicationList = () => {
  const [keyword, setKeyword] = useState('');
  const { applications } = useGetAllApplication(keyword);
  const [selectedApplicationId, setSelectedApplicationId] = useState(null);

  // Use optional chaining to safely access applications
  const applicationList = applications?.[0] || [];

  const handleSearch = (e) => {
    setKeyword(e.target.value);
  };

  const openModal = (id) => {
    // console.log("Opening modal with application ID:", id);
    setSelectedApplicationId(id);
  };

  const closeModal = () => {
    setSelectedApplicationId(null);
  };

  return (
    <div className="container mx-auto p-4 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Role Applications</h1>
      
      {/* Search Input */}
      <div className="mb-4 w-2/5">
        <Input
          placeholder="Search by title..."
          value={keyword}
          onChange={handleSearch}
        />
      </div>

      {/* Applications Table */}
      <div className="overflow-x-auto w-full max-w-3xl mx-auto">
        <Table className="text-sm w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Role Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-16 text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applicationList.map((app) => (
              <TableRow key={app.id}>
                <TableCell>{app.title}</TableCell>
                <TableCell className={`status ${app.status}`}>
                  {app.status === 'accepted' && <span className="text-green-600">Accepted</span>}
                  {app.status === 'rejected' && <span className="text-red-600">Rejected</span>}
                  {app.status === 'pending' && <span className="text-yellow-600">Pending</span>}
                </TableCell>
                <TableCell className="w-16 text-center">
                  <Button onClick={() => openModal(app.id)} variant="outline" className="w-full">
                    Detail
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Modal for Application Details */}
      {selectedApplicationId && (
        <ApplicationDetailModal
          isOpen={!!selectedApplicationId}
          onRequestClose={closeModal}
          applicationId={selectedApplicationId}
        />
      )}
    </div>
  );
};

export default ApplicationList;
