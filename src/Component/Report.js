import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, ButtonGroup, Button, Container, Row, Col } from "react-bootstrap";
import "./Report.module.css";



const Report = ({ jsonData, apiToken, user }) => {

    const fetchDataWithToken = async (url, token) => {
        console.log(token);
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            console.log('API Response:', data);

            const jsonBlob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });

            // Create a URL for the Blob and open it in a new tab
            const jsonUrl = URL.createObjectURL(jsonBlob);
            window.open(jsonUrl, '_blank');

            // You can handle the response data here
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // When the user clicks on the link, you can call the fetch function with the URL and token
    const handleTestResultClick = (url, token) => {
        fetchDataWithToken(url, token);
    };

    const handleTestCaseClick = (url, token) => {
        fetchDataWithToken(url, token);
    };

    const downloadReport = async () => {
        try {
            // Replace with your backend API endpoint that generates the Excel report
            const response = await fetch('http://localhost:8080/cyara/generate-report', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json", // Set the Content-Type to JSON
                },
                body: JSON.stringify(user)
            });

            // Check if the response is successful
            if (!response.ok) {
                throw new Error('Failed to fetch the report');
            }

            // Create a blob from the response and trigger a download
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'report.xlsx'); // Name of the file to download
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Error downloading report:', error);
        }
    };


    const initialData = jsonData.map((item) => ({
        category: item.category,
        count: item.data.length,
    }));

    const [filteredData, setFilteredData] = useState(initialData);
    const [selectedCategory, setSelectedCategory] = useState("All");

    const handleFilter = (category) => {
        if (category === "All") {
            setFilteredData(initialData);
            setSelectedCategory("All");
        } else {
            setFilteredData(initialData.filter((item) => item.category === category));
            setSelectedCategory(category);
        }
    };

    const selectedList =
        selectedCategory === "All"
            ? jsonData.flatMap((item) => item.data)
            : jsonData.find((item) => item.category === selectedCategory)?.data || [];

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col lg={10}>
                    {/* Filters in a Card */}
                    <Card className="mb-4 modern-card">
                        <Card.Header as="h5" className="text-center">
                            Filter by Category
                        </Card.Header>
                        <Card.Body>
                            <ButtonGroup className="d-flex justify-content-center">
                                <Button variant="primary" onClick={() => handleFilter("All")}>
                                    All
                                </Button>
                                <Button variant="success" onClick={() => handleFilter("Success")}>
                                    Success
                                </Button>
                                <Button variant="danger" onClick={() => handleFilter("Failed")}>
                                    Failed
                                </Button>
                                <Button variant="warning" onClick={() => handleFilter("Satisfactory")}>
                                    Satisfactory
                                </Button>
                                <Button variant="secondary" onClick={() => handleFilter("Aborted")}>
                                    Aborted
                                </Button>
                                <Button variant="info" onClick={() => handleFilter("Not Run")}>
                                    Not Run
                                </Button>
                            </ButtonGroup>
                        </Card.Body>
                    </Card>

                    {/* Bar Chart in a Card */}
                    <Card className="mb-4 modern-card">
                        <Card.Header as="h5" className="text-center">
                            Bar Chart Report
                        </Card.Header>
                        <Card.Body>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={filteredData}>
                                    <XAxis dataKey="category" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="count" fill="#007bff" />
                                </BarChart>
                            </ResponsiveContainer>
                        </Card.Body>
                    </Card>
                    <Card className="mb-4 modern-card">
                        <Card.Body className="d-flex justify-content-between align-items-center">
                            <h5 className="text-center">Download Report</h5>
                            <Button
                                variant="primary"
                                className="d-flex align-items-center"
                                onClick={downloadReport}
                            >
                                <i className="bi bi-download me-2"></i> {/* Bootstrap Icon for Download */}
                                Download Report
                            </Button>
                        </Card.Body>
                    </Card>

                    {/* List Data in a Card */}
                    <Card className="modern-card">
                        <Card.Header as="h5" className="text-center">
                            Details for {selectedCategory === "All" ? "All Categories" : selectedCategory}
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                {selectedList.length > 0 ? (
                                    selectedList.map((item, index) => (
                                        <Col md={6} className="mb-3" key={item.id || index}>
                                            <Card className="modern-card card-equal-height shadow-lg rounded-3">
                                                <Card.Body>
                                                    <Card.Title className="text-center">{item.name}</Card.Title>

                                                    {/* Test Case ID */}
                                                    <Card.Text className="mb-2">
                                                        <strong>Test Case ID:</strong> <span className="text-muted">{item.testCaseId}</span>
                                                    </Card.Text>

                                                    {/* Description */}
                                                    <Card.Text className="mb-2">
                                                        <strong>Description:</strong> {item.description}
                                                    </Card.Text>

                                                    {/* Folder Path */}
                                                    <Card.Text className="mb-2">
                                                        <strong>Folder Path:</strong> <span className="text-info">{item.folderPath}</span>
                                                    </Card.Text>

                                                    {/* Direction */}
                                                    <Card.Text className="mb-2">
                                                        <strong>Direction:</strong> <span className="badge text-bg-primary">{item.direction}</span>
                                                    </Card.Text>

                                                    {/* Destination */}
                                                    <Card.Text className="mb-2">
                                                        <strong>Destination:</strong> {item.destination}
                                                    </Card.Text>

                                                    {/* Last Result */}
                                                    <Card.Text className="mb-2">
                                                        <strong>Last Result:</strong>
                                                        <span className={`badge ${item.lastResult.result === "Passed" ? "bg-success" : "bg-danger"}`}>
                                                            {item.lastResult.result}
                                                        </span>
                                                    </Card.Text>

                                                    {/* Run Date */}
                                                    <Card.Text className="mb-2">
                                                        <strong>Run Date:</strong> {new Date(item.lastResult.runDate).toLocaleString()}
                                                    </Card.Text>

                                                    {/* Links */}
                                                    <Card.Link
                                                        href="#"
                                                        onClick={(e) => {
                                                            e.preventDefault(); // Prevent the default link behavior
                                                            handleTestResultClick(item.lastResult.url, apiToken); // Pass token
                                                        }}
                                                        className="text-decoration-none"
                                                    >
                                                        <i className="bi bi-link-45deg me-2"></i>View Test Result
                                                    </Card.Link>

                                                    <Card.Link
                                                        href="#"
                                                        onClick={(e) => {
                                                            e.preventDefault(); // Prevent the default link behavior
                                                            handleTestCaseClick(item.url, apiToken); // Pass token
                                                        }}
                                                        className="text-decoration-none"
                                                    >
                                                        <i className="bi bi-link-45deg me-2"></i>View Test Case
                                                    </Card.Link>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))
                                ) : (
                                    <p className="text-center">No data available for this category.</p>
                                )}
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};


// const jsonData = {
//     "folderData": {
//         "Success": [
//             { id: 1, name: "Task A", description: "Completed successfully" },
//             { id: 2, name: "Task B", description: "No issues found" },
//         ],
//         "Failed": [
//             { id: 3, name: "Task C", description: "Error occurred" },
//             { id: 4, name: "Task D", description: "Process halted" },
//         ],
//         "Satisfactory": [
//             { id: 5, name: "Task E", description: "Met expectations" },
//             { id: 6, name: "Task F", description: "Adequate results" },
//         ],
//         "Aborted": [
//             { id: 7, name: "Task G", description: "Canceled by user" },
//             { id: 8, name: "Task H", description: "Operation timed out" },
//         ],
//         "Not Run": [
//             { id: 9, name: "Task I", description: "Skipped due to conditions" },
//             { id: 10, name: "Task J", description: "Not executed by user choice" },
//         ]
//     },
//     "success" : 20,
//     "failed" : 10,
//     "satisfactory" : 15,
//     "Aborted" : 12,
//     "Not Run" : 11
// }


const TaskStatusReport = () => {
    // Use useLocation hook to get data passed via state
    const location = useLocation();
    const { apiData, apiToken, user } = location.state || {}; // Safely access apiData passed via location

    const jsonData = [
        {
            category: "Success",
            data: apiData.folderData.Success
        },
        {
            category: "Failed",
            data: apiData.folderData.Failed
        },
        {
            category: "Satisfactory",
            data: apiData.folderData.Satisfactory
        },
        {
            category: "Aborted",
            data: apiData.folderData.Aborted
        },
        {
            category: "Not Run",
            data: apiData.folderData["Not Run"]
        }
    ];

    // Fallback to empty object if no data is provided
    if (!apiData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {/* Render BarChart component with data */}
            <Report jsonData={jsonData} apiToken={apiToken} user={user}/>
        </div>
    );
};

export default TaskStatusReport;

