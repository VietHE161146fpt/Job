import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, TableCell, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import { ChevronDown, ChevronUp } from "lucide-react";

const AppliedJobTable = () => {
  const [allAppliedJobs, setAllAppliedJobs] = useState([]);
  const [expandedRows, setExpandedRows] = useState({});

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9999/api/application/get",
          {
            withCredentials: true,
          }
        );

        console.log("Fetched jobs:", response.data);

        if (response.data && Array.isArray(response.data.application)) {
          setAllAppliedJobs(response.data.application);
        } else {
          console.error("Expected an array but got:", response.data);
          setAllAppliedJobs([]);
        }
      } catch (error) {
        console.error("Error fetching applied jobs:", error);
        setAllAppliedJobs([]);
      }
    };

    fetchAppliedJobs();
  }, []);

  const toggleRow = (id) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <Table>
      <thead>
        <tr>
          <th>Date Applied</th>
          <th>Job Title</th>
          <th>Company</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(allAppliedJobs) && allAppliedJobs.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className="text-center">
              You haven't applied to any jobs yet.
            </TableCell>
          </TableRow>
        ) : (
          Array.isArray(allAppliedJobs) &&
          allAppliedJobs.map((appliedJob) => (
            <React.Fragment key={appliedJob._id}>
              <TableRow>
                <TableCell>{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                <TableCell>{appliedJob.job?.title}</TableCell>
                <TableCell>{appliedJob.job?.company?.name}</TableCell>
                <TableCell>
                  <Badge
                    className={`${
                      appliedJob?.status === "rejected"
                        ? "bg-red-400"
                        : appliedJob.status === "pending"
                        ? "bg-gray-400"
                        : "bg-green-400"
                    }`}
                  >
                    {appliedJob.status.toUpperCase()}
                  </Badge>
                </TableCell>
                <TableCell>
                  {(appliedJob.status === "accepted" ||
                    appliedJob.status === "rejected") && (
                    <button
                      onClick={() => toggleRow(appliedJob._id)}
                      className="p-1 hover:bg-gray-100 rounded-full"
                    >
                      {expandedRows[appliedJob._id] ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </button>
                  )}
                </TableCell>
              </TableRow>
              {expandedRows[appliedJob._id] && (
                <TableRow>
                  <TableCell colSpan={5} className="bg-gray-50">
                    <div className="p-4">
                      {appliedJob.status === "accepted" ? (
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <span className="font-medium w-24">Location:</span>
                            <span>
                              {appliedJob.location || "Not specified"}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <span className="font-medium w-24">Time:</span>
                            <span>
                              {appliedJob.time
                                ? new Date(appliedJob.time).toLocaleString()
                                : "Not specified"}
                            </span>
                          </div>
                        </div>
                      ) : appliedJob.status === "rejected" ? (
                        <div>
                          <span className="font-medium">Reason:</span>
                          <p className="mt-1">
                            {appliedJob.reason || "No reason provided"}
                          </p>
                        </div>
                      ) : null}
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          ))
        )}
      </tbody>
    </Table>
  );
};

export default AppliedJobTable;
