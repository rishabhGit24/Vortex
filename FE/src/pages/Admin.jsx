import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/admin.css';

const Admin = () => {
    const [companies, setCompanies] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [complaints, setComplaints] = useState([]);
    const [selectedComplaint, setSelectedComplaint] = useState(null);
    const [error, setError] = useState(null);
    const [companySummary, setCompanySummary] = useState({ frequency: {}, abuseType: {} });

    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            setError("You must be logged in to access this page.");
            navigate("/login?type=admin");
        }
    }, [token, navigate]);

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await axios.get("http://localhost:5000/reports/companies", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setCompanies(response.data);
                setError(null);
            } catch (error) {
                if (error.response?.status === 403) {
                    setError("Access denied: You must be an admin to view this page.");
                    navigate("/login?type=admin");
                } else {
                    setError("Error fetching companies: " + (error.response?.data?.message || error.message));
                }
            }
        };
        if (token) {
            fetchCompanies();
        }
    }, [token, navigate]);

    const handleCompanyClick = async (company) => {
        if (selectedCompany === company) {
            setSelectedCompany(null);
            setComplaints([]);
            setCompanySummary({ frequency: {}, abuseType: {} });
            return;
        }

        setSelectedCompany(company);
        setSelectedComplaint(null);
        try {
            const response = await axios.get(`http://localhost:5000/reports/company/${company}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const fetchedComplaints = response.data;
            setComplaints(fetchedComplaints);
            setError(null);

            const frequencyCounts = {};
            const abuseTypeCounts = {};
            fetchedComplaints.forEach((complaint) => {
                frequencyCounts[complaint.frequency] = (frequencyCounts[complaint.frequency] || 0) + 1;
                abuseTypeCounts[complaint.abuseType] = (abuseTypeCounts[complaint.abuseType] || 0) + 1;
            });
            setCompanySummary({ frequency: frequencyCounts, abuseType: abuseTypeCounts });
        } catch (error) {
            setError("Error fetching complaints: " + (error.response?.data?.message || error.message));
        }
    };

    const handleComplaintClick = async (complaintId) => {
        try {
            const response = await axios.get(`http://localhost:5000/reports/${complaintId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setSelectedComplaint(response.data);
            setError(null);
        } catch (error) {
            setError("Error fetching complaint details: " + (error.response?.data?.message || error.message));
        }
    };

    return (
        <div className="admin-portal">
            <h1 className="portal-title">Admin Portal</h1>

            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}

            <div className="companies-section">
                <h2 className="section-title">Companies</h2>
                {companies.length > 0 ? (
                    <div className="companies-list">
                        {companies.map((company) => (
                            <div
                                key={company}
                                onClick={() => handleCompanyClick(company)}
                                className={`company-card ${selectedCompany === company ? 'selected' : ''}`}
                            >
                                <div className="company-header">
                                    <svg
                                        className="company-icon"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                        />
                                    </svg>
                                    <h3>{company}</h3>
                                    <svg
                                        className={`arrow-icon ${selectedCompany === company ? 'rotate' : ''}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </div>
                                <div className="company-summary">
                                    {Object.keys(companySummary.frequency).length > 0 || Object.keys(companySummary.abuseType).length > 0 ? (
                                        <div className="summary-content">
                                            <div className="summary-section">
                                                <h4>Frequency</h4>
                                                {Object.keys(companySummary.frequency).length > 0 ? (
                                                    <ul>
                                                        {Object.entries(companySummary.frequency).map(([freq, count]) => (
                                                            <li key={freq}>
                                                                <span>{freq}:</span> {count}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                ) : (
                                                    <p>No frequency data available.</p>
                                                )}
                                            </div>
                                            <div className="summary-section">
                                                <h4>Abuse Type</h4>
                                                {Object.keys(companySummary.abuseType).length > 0 ? (
                                                    <ul>
                                                        {Object.entries(companySummary.abuseType).map(([type, count]) => (
                                                            <li key={type}>
                                                                <span>{type}:</span> {count}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                ) : (
                                                    <p>No abuse type data available.</p>
                                                )}
                                            </div>
                                        </div>
                                    ) : (
                                        <p>Click to load summary.</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    !error && <p className="no-data">No companies found.</p>
                )}
            </div>

            {selectedCompany && (
                <div className="complaints-section">
                    <h2 className="section-title">Complaints for {selectedCompany}</h2>
                    {complaints.length > 0 ? (
                        <div className="complaints-list">
                            {complaints.map((complaint) => (
                                <div
                                    key={complaint._id}
                                    onClick={() => handleComplaintClick(complaint._id)}
                                    className={`complaint-card ${selectedComplaint?._id === complaint._id ? 'selected' : ''}`}
                                >
                                    <p><strong>Type:</strong> {complaint.abuseType}</p>
                                    <p><strong>Frequency:</strong> {complaint.frequency}</p>
                                    <p><strong>Date:</strong> {new Date(complaint.createdAt).toLocaleDateString()}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="no-data">No complaints found for this company.</p>
                    )}
                </div>
            )}

            {selectedComplaint && (
                <div className="complaint-details-section">
                    <h2 className="section-title">Complaint Details</h2>
                    <div className="complaint-details-card">
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