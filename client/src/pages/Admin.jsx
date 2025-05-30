import axios from "axios";
import React, { useEffect, useState } from "react";

const Admin = () => {
    const [companies, setCompanies] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [complaints, setComplaints] = useState([]);
    const [selectedComplaint, setSelectedComplaint] = useState(null);

    // Fetch token from localStorage (set during login)
    const token = localStorage.getItem("token");

    // Fetch all companies on mount
    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await axios.get("http://localhost:5000/reports/companies", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setCompanies(response.data);
            } catch (error) {
                console.error("Error fetching companies:", error);
            }
        };
        fetchCompanies();
    }, []);

    // Fetch complaints for a selected company
    const handleCompanyClick = async (company) => {
        setSelectedCompany(company);
        setSelectedComplaint(null); // Reset complaint details
        try {
            const response = await axios.get(`http://localhost:5000/reports/company/${company}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setComplaints(response.data);
        } catch (error) {
            console.error("Error fetching complaints:", error);
        }
    };

    // Fetch details of a specific complaint
    const handleComplaintClick = async (complaintId) => {
        try {
            const response = await axios.get(`http://localhost:5000/reports/${complaintId}`, {
                // In your fetch calls, ensure headers include:
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    'Content-Type': 'application/json'
                }
            });
            setSelectedComplaint(response.data);
        } catch (error) {
            console.error("Error fetching complaint details:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Admin Portal</h1>

            {/* Companies List */}
            <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-4">Companies</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {companies.map((company) => (
                        <div
                            key={company}
                            onClick={() => handleCompanyClick(company)}
                            className={`p-4 rounded-lg shadow-md cursor-pointer ${selectedCompany === company ? "bg-blue-500 text-white" : "bg-white"
                                }`}
                        >
                            {company}
                        </div>
                    ))}
                </div>
            </div>

            {/* Complaints List */}
            {selectedCompany && (
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold mb-4">
                        Complaints for {selectedCompany}
                    </h2>
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
                        <p>No complaints found for this company.</p>
                    )}
                </div>
            )}

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

export default Admin;