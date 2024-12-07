import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, ButtonGroup, Button, Container, Row, Col, Spinner } from "react-bootstrap";
import "./Report.module.css";



const Report = ({ jsonData}) => {
    const [isLoading, setIsLoading] = useState(false);

    const downloadReport = async () => {
        setIsLoading(true);
        try {
            console.log("file will be download for real data only");
        } catch (error) {
            console.error('Error downloading report:', error);
        }finally {
            setIsLoading(false); // Reset loading state once the API call is complete
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
                                disabled={isLoading} // Disable button while loading
                            >
                                {isLoading ? (
                                    <Spinner animation="border" size="sm" className="me-2" /> // Show spinner
                                ) : (
                                    <i className="bi bi-download me-2"></i> // Show download icon
                                )}
                                {isLoading ? 'Downloading...' : 'Download Report'}
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
                                                        href={item.lastResult.url}
                                                        target="_blank"
                                                        className="text-decoration-none"
                                                    >
                                                        <i className="bi bi-link-45deg me-2"></i>View Test Result
                                                    </Card.Link>

                                                    <Card.Link
                                                        href={item.url}
                                                        target="_blank"
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
const data = {
    "folderData": {
        "Satisfactory": [
            { "testCaseId": 300001, "name": "TestCase_Satisfactory_1", "description": "Description for satisfactory case 1.", "folderPath": "Ashish_Demo", "direction": "Outbound", "destination": "1234567892", "lastResult": { "result": "Satisfactory", "runDate": "2024-12-03T15:45:00Z", "resultId": "300001", "url": "https://example.com/results/300001" }, "url": "https://example.com/testcases/300001" },
            { "testCaseId": 300002, "name": "TestCase_Satisfactory_2", "description": "Description for satisfactory case 2.", "folderPath": "Ashish_Demo", "direction": "Outbound", "destination": "1234567893", "lastResult": { "result": "Satisfactory", "runDate": "2024-12-04T10:00:00Z", "resultId": "300002", "url": "https://example.com/results/300002" }, "url": "https://example.com/testcases/300002" },
            { "testCaseId": 300003, "name": "TestCase_Satisfactory_3", "description": "Description for satisfactory case 3.", "folderPath": "Ashish_Demo", "direction": "Inbound", "destination": "1234567894", "lastResult": { "result": "Satisfactory", "runDate": "2024-12-05T12:30:00Z", "resultId": "300003", "url": "https://example.com/results/300003" }, "url": "https://example.com/testcases/300003" },
            { "testCaseId": 300004, "name": "TestCase_Satisfactory_4", "description": "Description for satisfactory case 4.", "folderPath": "Ashish_Demo", "direction": "Outbound", "destination": "1234567895", "lastResult": { "result": "Satisfactory", "runDate": "2024-12-06T11:15:00Z", "resultId": "300004", "url": "https://example.com/results/300004" }, "url": "https://example.com/testcases/300004" },
            { "testCaseId": 300005, "name": "TestCase_Satisfactory_5", "description": "Description for satisfactory case 5.", "folderPath": "Ashish_Demo", "direction": "Inbound", "destination": "1234567896", "lastResult": { "result": "Satisfactory", "runDate": "2024-12-07T14:45:00Z", "resultId": "300005", "url": "https://example.com/results/300005" }, "url": "https://example.com/testcases/300005" }
        ],
        "Success": [
            { "testCaseId": 200001, "name": "TestCase_Success_1", "description": "Description for success case 1.", "folderPath": "Ashish_Demo", "direction": "Outbound", "destination": "1234567897", "lastResult": { "result": "Success", "runDate": "2024-12-01T09:00:00Z", "resultId": "200001", "url": "https://example.com/results/200001" }, "url": "https://example.com/testcases/200001" },
            { "testCaseId": 200002, "name": "TestCase_Success_2", "description": "Description for success case 2.", "folderPath": "Ashish_Demo", "direction": "Inbound", "destination": "1234567898", "lastResult": { "result": "Success", "runDate": "2024-12-02T10:00:00Z", "resultId": "200002", "url": "https://example.com/results/200002" }, "url": "https://example.com/testcases/200002" },
            { "testCaseId": 200003, "name": "TestCase_Success_3", "description": "Description for success case 3.", "folderPath": "Ashish_Demo", "direction": "Outbound", "destination": "1234567899", "lastResult": { "result": "Success", "runDate": "2024-12-03T11:00:00Z", "resultId": "200003", "url": "https://example.com/results/200003" }, "url": "https://example.com/testcases/200003" },
            { "testCaseId": 200004, "name": "TestCase_Success_4", "description": "Description for success case 4.", "folderPath": "Ashish_Demo", "direction": "Inbound", "destination": "1234567800", "lastResult": { "result": "Success", "runDate": "2024-12-04T12:00:00Z", "resultId": "200004", "url": "https://example.com/results/200004" }, "url": "https://example.com/testcases/200004" },
            { "testCaseId": 200005, "name": "TestCase_Success_5", "description": "Description for success case 5.", "folderPath": "Ashish_Demo", "direction": "Outbound", "destination": "1234567801", "lastResult": { "result": "Success", "runDate": "2024-12-05T13:00:00Z", "resultId": "200005", "url": "https://example.com/results/200005" }, "url": "https://example.com/testcases/200005" },
            { "testCaseId": 200006, "name": "TestCase_Success_6", "description": "Description for success case 6.", "folderPath": "Ashish_Demo", "direction": "Outbound", "destination": "1234567802", "lastResult": { "result": "Success", "runDate": "2024-12-06T14:00:00Z", "resultId": "200006", "url": "https://example.com/results/200006" }, "url": "https://example.com/testcases/200006" },
            { "testCaseId": 200007, "name": "TestCase_Success_7", "description": "Description for success case 7.", "folderPath": "Ashish_Demo", "direction": "Inbound", "destination": "1234567803", "lastResult": { "result": "Success", "runDate": "2024-12-07T15:00:00Z", "resultId": "200007", "url": "https://example.com/results/200007" }, "url": "https://example.com/testcases/200007" },
            { "testCaseId": 200008, "name": "TestCase_Success_8", "description": "Description for success case 8.", "folderPath": "Ashish_Demo", "direction": "Outbound", "destination": "1234567804", "lastResult": { "result": "Success", "runDate": "2024-12-08T16:00:00Z", "resultId": "200008", "url": "https://example.com/results/200008" }, "url": "https://example.com/testcases/200008" },
            { "testCaseId": 200009, "name": "TestCase_Success_9", "description": "Description for success case 9.", "folderPath": "Ashish_Demo", "direction": "Inbound", "destination": "1234567805", "lastResult": { "result": "Success", "runDate": "2024-12-09T17:00:00Z", "resultId": "200009", "url": "https://example.com/results/200009" }, "url": "https://example.com/testcases/200009" },
            { "testCaseId": 200010, "name": "TestCase_Success_10", "description": "Description for success case 10.", "folderPath": "Ashish_Demo", "direction": "Outbound", "destination": "1234567806", "lastResult": { "result": "Success", "runDate": "2024-12-10T18:00:00Z", "resultId": "200010", "url": "https://example.com/results/200010" }, "url": "https://example.com/testcases/200010" }
        ],
        "Aborted": [
            { "testCaseId": 400001, "name": "TestCase_Aborted_1", "description": "Description for aborted case 1.", "folderPath": "Ashish_Demo", "direction": "Inbound", "destination": "1234567807", "lastResult": { "result": "Aborted", "runDate": "2024-12-01T09:00:00Z", "resultId": "400001", "url": "https://example.com/results/400001" }, "url": "https://example.com/testcases/400001" },
            { "testCaseId": 400002, "name": "TestCase_Aborted_2", "description": "Description for aborted case 2.", "folderPath": "Ashish_Demo", "direction": "Outbound", "destination": "1234567808", "lastResult": { "result": "Aborted", "runDate": "2024-12-02T10:00:00Z", "resultId": "400002", "url": "https://example.com/results/400002" }, "url": "https://example.com/testcases/400002" },
            { "testCaseId": 400003, "name": "TestCase_Aborted_3", "description": "Description for aborted case 3.", "folderPath": "Ashish_Demo", "direction": "Inbound", "destination": "1234567809", "lastResult": { "result": "Aborted", "runDate": "2024-12-03T11:00:00Z", "resultId": "400003", "url": "https://example.com/results/400003" }, "url": "https://example.com/testcases/400003" },
            { "testCaseId": 400004, "name": "TestCase_Aborted_4", "description": "Description for aborted case 4.", "folderPath": "Ashish_Demo", "direction": "Outbound", "destination": "1234567810", "lastResult": { "result": "Aborted", "runDate": "2024-12-04T12:00:00Z", "resultId": "400004", "url": "https://example.com/results/400004" }, "url": "https://example.com/testcases/400004" },
            { "testCaseId": 400005, "name": "TestCase_Aborted_5", "description": "Description for aborted case 5.", "folderPath": "Ashish_Demo", "direction": "Inbound", "destination": "1234567811", "lastResult": { "result": "Aborted", "runDate": "2024-12-05T13:00:00Z", "resultId": "400005", "url": "https://example.com/results/400005" }, "url": "https://example.com/testcases/400005" },
            { "testCaseId": 400006, "name": "TestCase_Aborted_6", "description": "Description for aborted case 6.", "folderPath": "Ashish_Demo", "direction": "Outbound", "destination": "1234567812", "lastResult": { "result": "Aborted", "runDate": "2024-12-06T14:00:00Z", "resultId": "400006", "url": "https://example.com/results/400006" }, "url": "https://example.com/testcases/400006" }
        ],
        "Failed": [
            { "testCaseId": 500001, "name": "TestCase_Failed_1", "description": "Description for failed case 1.", "folderPath": "Ashish_Demo", "direction": "Inbound", "destination": "1234567813", "lastResult": { "result": "Failed", "runDate": "2024-12-01T09:00:00Z", "resultId": "500001", "url": "https://example.com/results/500001" }, "url": "https://example.com/testcases/500001" },
            { "testCaseId": 500002, "name": "TestCase_Failed_2", "description": "Description for failed case 2.", "folderPath": "Ashish_Demo", "direction": "Outbound", "destination": "1234567814", "lastResult": { "result": "Failed", "runDate": "2024-12-02T10:00:00Z", "resultId": "500002", "url": "https://example.com/results/500002" }, "url": "https://example.com/testcases/500002" },
            { "testCaseId": 500003, "name": "TestCase_Failed_3", "description": "Description for failed case 3.", "folderPath": "Ashish_Demo", "direction": "Inbound", "destination": "1234567815", "lastResult": { "result": "Failed", "runDate": "2024-12-03T11:00:00Z", "resultId": "500003", "url": "https://example.com/results/500003" }, "url": "https://example.com/testcases/500003" },
            { "testCaseId": 500004, "name": "TestCase_Failed_4", "description": "Description for failed case 4.", "folderPath": "Ashish_Demo", "direction": "Outbound", "destination": "1234567816", "lastResult": { "result": "Failed", "runDate": "2024-12-04T12:00:00Z", "resultId": "500004", "url": "https://example.com/results/500004" }, "url": "https://example.com/testcases/500004" },
            { "testCaseId": 500005, "name": "TestCase_Failed_5", "description": "Description for failed case 5.", "folderPath": "Ashish_Demo", "direction": "Inbound", "destination": "1234567817", "lastResult": { "result": "Failed", "runDate": "2024-12-05T13:00:00Z", "resultId": "500005", "url": "https://example.com/results/500005" }, "url": "https://example.com/testcases/500005" },
            { "testCaseId": 500006, "name": "TestCase_Failed_6", "description": "Description for failed case 6.", "folderPath": "Ashish_Demo", "direction": "Outbound", "destination": "1234567818", "lastResult": { "result": "Failed", "runDate": "2024-12-06T14:00:00Z", "resultId": "500006", "url": "https://example.com/results/500006" }, "url": "https://example.com/testcases/500006" },
            { "testCaseId": 500007, "name": "TestCase_Failed_7", "description": "Description for failed case 7.", "folderPath": "Ashish_Demo", "direction": "Inbound", "destination": "1234567819", "lastResult": { "result": "Failed", "runDate": "2024-12-07T15:00:00Z", "resultId": "500007", "url": "https://example.com/results/500007" }, "url": "https://example.com/testcases/500007" },
            { "testCaseId": 500008, "name": "TestCase_Failed_8", "description": "Description for failed case 8.", "folderPath": "Ashish_Demo", "direction": "Outbound", "destination": "1234567820", "lastResult": { "result": "Failed", "runDate": "2024-12-08T16:00:00Z", "resultId": "500008", "url": "https://example.com/results/500008" }, "url": "https://example.com/testcases/500008" }
        ],
        "Not Run": [
            { "testCaseId": 600001, "name": "TestCase_NotRun_1", "description": "Description for not run case 1.", "folderPath": "Ashish_Demo", "direction": "Inbound", "destination": "1234567821", "lastResult": { "result": "Not Run", "runDate": "2024-12-01T09:00:00Z", "resultId": "600001", "url": "https://example.com/results/600001" }, "url": "https://example.com/testcases/600001" },
            { "testCaseId": 600002, "name": "TestCase_NotRun_2", "description": "Description for not run case 2.", "folderPath": "Ashish_Demo", "direction": "Outbound", "destination": "1234567822", "lastResult": { "result": "Not Run", "runDate": "2024-12-02T10:00:00Z", "resultId": "600002", "url": "https://example.com/results/600002" }, "url": "https://example.com/testcases/600002" },
            { "testCaseId": 600003, "name": "TestCase_NotRun_3", "description": "Description for not run case 3.", "folderPath": "Ashish_Demo", "direction": "Inbound", "destination": "1234567823", "lastResult": { "result": "Not Run", "runDate": "2024-12-03T11:00:00Z", "resultId": "600003", "url": "https://example.com/results/600003" }, "url": "https://example.com/testcases/600003" },
            { "testCaseId": 600004, "name": "TestCase_NotRun_4", "description": "Description for not run case 4.", "folderPath": "Ashish_Demo", "direction": "Outbound", "destination": "1234567824", "lastResult": { "result": "Not Run", "runDate": "2024-12-04T12:00:00Z", "resultId": "600004", "url": "https://example.com/results/600004" }, "url": "https://example.com/testcases/600004" },
            { "testCaseId": 600005, "name": "TestCase_NotRun_5", "description": "Description for not run case 5.", "folderPath": "Ashish_Demo", "direction": "Inbound", "destination": "1234567825", "lastResult": { "result": "Not Run", "runDate": "2024-12-05T13:00:00Z", "resultId": "600005", "url": "https://example.com/results/600005" }, "url": "https://example.com/testcases/600005" },
            { "testCaseId": 600006, "name": "TestCase_NotRun_6", "description": "Description for not run case 6.", "folderPath": "Ashish_Demo", "direction": "Outbound", "destination": "1234567826", "lastResult": { "result": "Not Run", "runDate": "2024-12-06T14:00:00Z", "resultId": "600006", "url": "https://example.com/results/600006" }, "url": "https://example.com/testcases/600006" },
            { "testCaseId": 600007, "name": "TestCase_NotRun_7", "description": "Description for not run case 7.", "folderPath": "Ashish_Demo", "direction": "Inbound", "destination": "1234567827", "lastResult": { "result": "Not Run", "runDate": "2024-12-07T15:00:00Z", "resultId": "600007", "url": "https://example.com/results/600007" }, "url": "https://example.com/testcases/600007" },
            { "testCaseId": 600008, "name": "TestCase_NotRun_8", "description": "Description for not run case 8.", "folderPath": "Ashish_Demo", "direction": "Outbound", "destination": "1234567828", "lastResult": { "result": "Not Run", "runDate": "2024-12-08T16:00:00Z", "resultId": "600008", "url": "https://example.com/results/600008" }, "url": "https://example.com/testcases/600008" }
        ]
    }
}


const DemoReport = () => {
    const jsonData = [
        {
            category: "Success",
            data: data.folderData.Success
        },
        {
            category: "Failed",
            data: data.folderData.Failed
        },
        {
            category: "Satisfactory",
            data: data.folderData.Satisfactory
        },
        {
            category: "Aborted",
            data: data.folderData.Aborted
        },
        {
            category: "Not Run",
            data: data.folderData["Not Run"]
        }
    ];

    // Fallback to empty object if no data is provided
    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {/* Render BarChart component with data */}
            <Report jsonData={jsonData} />
        </div>
    );
};

export default DemoReport;

