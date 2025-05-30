import axios from "axios";
import React, { useEffect, useState } from "react";

const Client = () => {
    const [complaints, setComplaints] = useState([]);
    const [selectedComplaint, setSelectedComplaint] = useState(null);

    // Fetch token and company name from localStorage (set during login)
    const token = localStorage.getItem("token");
    const company = localStorage.getItem("company"); // Assuming company is stored during login

    // Fetch all complaints for the client on mount
    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const response = await axios.get("http://localhost:5000/reports/client", {
                    headers: { Authorization: `Bearer ${token}` },
                    params: { company }, // Pass company name as query param
                });
                setComplaints(response.data);
            } catch (error) {
                console.error("Error fetching complaints:", error);
            }
        };
        fetchComplaints();
    }, []);

    // Fetch details of a specific complaint
    const handleComplaintClick = async (complaintId) => {
        try {
            const response = await axios.get(`http://localhost:5000/reports/${complaintId}`, {
                headers: { Authorization: `Bearer ${token}` },
                params: { company }, // Pass company name for validation
            });
            setSelectedComplaint(response.data);
        } catch (error) {
            console.error("Error fetching complaint details:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Client Portal</h1>

            {/* Complaints List */}
            <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-4">Your Complaints</h2>
                {complaints.length > 0 ? (
                    <div className="space-y-4">
                        {complaints.map((complaint) => (
                            <div
                                key={complaint._id}
                                onClick={() => handleComplaintClick(complaint._id)}
                                className={`p-4 rounded-lg shadow-md cursor-pointer ${selectedComplaint?._id === complaint._id
                                        ? "bg-blue-500 text-white"
                                        : "bg-white"
                                    }`}
                            >
                                <p><strong>Type:</strong> {complaint.abuseType}</p>
                                <p><strong>Frequency:</strong> {complaint.frequency}</p>
                                <p><strong>Date:</strong> {new Date(complaint.createdAt).toLocaleDateString()}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No complaints found.</p>
                )}
            </div>

            {/* Complaint Details */}
            {selectedComplaint && (
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Complaint Details</h2>
                    <div className="p-4 bg-white rounded-lg shadow-md">
                        <p><strong>Company:</strong> {selectedComplaint.company}</p>
                        <p><strong>Type:</strong> {selectedComplaint.abuseType}</p>
                        <p><strong>Frequency:</strong> {selectedComplaint.frequency}</p>
                        <p><strong>Description:</strong> {selectedComplaint.description}</p>
                        <p><strong>Date:</strong> {new Date(selectedComplaint.createdAt).toLocaleString()}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Client;