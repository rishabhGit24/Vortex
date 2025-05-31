// client.jsx
import axios from "axios";
import { useEffect, useState } from "react";

const Client = () => {
    const [complaints, setComplaints] = useState([]);
    const [selectedComplaint, setSelectedComplaint] = useState(null);
    const [error, setError] = useState(null);

    // Fetch token and company name from localStorage
    const token = localStorage.getItem("token");
    const company = localStorage.getItem("company");

    // Fetch all complaints for the client on mount
    useEffect(() => {
        if (!token || !company) {
            setError("Please log in to view complaints.");
            return;
        }

        const fetchComplaints = async () => {
            try {
                const response = await axios.get("http://localhost:5000/reports/client", {
                    headers: { Authorization: `Bearer ${token}` },
                    params: { company }, // Send company as query param
                });
                setComplaints(response.data);
                setError(null);
            } catch (error) {
                console.error("Error fetching complaints:", error);
                setError(error.response?.data?.error || "Failed to fetch complaints.");
            }
        };
        fetchComplaints();
    }, [token, company]);

    // Fetch details of a specific complaint
    const handleComplaintClick = async (complaintId) => {
        try {
            const response = await axios.get(`http://localhost:5000/reports/${complaintId}`, {
                headers: { Authorization: `Bearer ${token}` },
                params: { company }, // Send company as query param
            });
            setSelectedComplaint(response.data);
            setError(null);
        } catch (error) {
            console.error("Error fetching complaint details:", error);
            setError(error.response?.data?.error || "Failed to fetch complaint details.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Client Portal</h1>

            {/* Error Message */}
            {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

            {/* Complaints List */}
            <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-4">Your Complaints</h2>
                {complaints.length > 0 ? (
                    <div className="space-y-4">
                        {complaints.map((complaint) => (
                            <div
                                key={complaint._id}
                                onClick={() => handleComplaintClick(complaint._id)}
                                className={`p-4 rounded-lg shadow-md cursor-pointer ${selectedComplaint?._id === complaint._id ? "bg-blue-500 text-white" : "bg-white"
                                    }`}
                            >
                                <p><strong>Type:</strong> {complaint.abuseType}</p>
                                <p><strong>Frequency:</strong> {complaint.frequency}</p>
                                <p><strong>Date:</strong> {new Date(complaint.createdAt).toLocaleDateString()}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No complaints found.</p>
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