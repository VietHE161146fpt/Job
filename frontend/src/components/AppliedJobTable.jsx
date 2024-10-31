import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableCell, TableRow } from './ui/table';
import { Badge } from './ui/badge';

const AppliedJobTable = () => {
    const [allAppliedJobs, setAllAppliedJobs] = useState([]);

    useEffect(() => {
        const fetchAppliedJobs = async () => {
            try {
                const response = await axios.get('http://localhost:9999/api/application/get', {
                    withCredentials: true // Đảm bảo cookie được gửi
                });

                // Kiểm tra dữ liệu nhận được
                console.log('Fetched jobs:', response.data);

                if (response.data && Array.isArray(response.data.application)) {
                    setAllAppliedJobs(response.data.application);
                } else {
                    console.error('Expected an array but got:', response.data);
                    setAllAppliedJobs([]);
                }
            } catch (error) {
                console.error("Error fetching applied jobs:", error);
                setAllAppliedJobs([]);
            }
        };

        fetchAppliedJobs();
    }, []);

    return (
        <Table>
            <thead>
                <tr>
                    <th>Date Applied</th>
                    <th>Job Title</th>
                    <th>Company</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {
                    Array.isArray(allAppliedJobs) && allAppliedJobs.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center">You haven't applied to any jobs yet.</TableCell>
                        </TableRow>
                    ) : Array.isArray(allAppliedJobs) && allAppliedJobs.map((appliedJob) => (
                        <TableRow key={appliedJob._id}>
                            <TableCell>{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                            <TableCell>{appliedJob.job?.title}</TableCell>
                            <TableCell>{appliedJob.job?.company?.name}</TableCell>
                            <TableCell className="text-right">
                                <Badge className={`${appliedJob?.status === "rejected" ? 'bg-red-400' : appliedJob.status === 'pending' ? 'bg-gray-400' : 'bg-green-400'}`}>
                                    {appliedJob.status.toUpperCase()}
                                </Badge>
                            </TableCell>
                        </TableRow>
                    ))
                }
            </tbody>
        </Table>
    );
};

export default AppliedJobTable;
