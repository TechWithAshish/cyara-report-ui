import React, { useState } from "react";
import { Form, Button, Card, Container, Row, Col, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const UserDataForm = () => {
    const Navigate = useNavigate();
    const [formData, setFormData] = useState({
        baseUrl: "",
        apiToken: "",
        folderName: "",
        accountId: "",
    });
    const [loading, setLoading] = useState(false); // State to handle loading spinner

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Show spinner
        try {
            const response = await fetch(`http://localhost:8080/cyara/folder/result`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", // Set the Content-Type to JSON
                },
                body: JSON.stringify(formData), // Convert the formData object to JSON
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("API Response:", data);
            Navigate("/generate-report", { state: { apiData: data, apiToken: formData.apiToken, user: formData } });
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false); // Hide spinner when API call completes
        }
    };


    return (
        <Container className="d-flex justify-content-center align-items-center mt-5">
            <Row>
                <Col>
                    <Card
                        className="shadow-lg "
                        style={{
                            maxWidth: "900px", // Standard width
                            minWidth: "400px",
                            width: "100%",
                            borderRadius: "15px",
                            minHeight: "500px", // Add minimum height for length
                            padding: "20px", // Add padding for a comfortable layout
                        }}
                    >
                        <Card.Body>
                            <h3 className="text-center mb-4">User Data Form</h3>
                            <Form onSubmit={handleSubmit}>
                                {/* Base URL */}
                                <Form.Group className="mb-3" controlId="formBaseUrl">
                                    <Form.Label className="d-flex align-items-center">
                                        Base URL
                                        <a
                                            href="https://developer.cyara.com/hc/en-us/articles/360001040256-Using-the-Cyara-3-0-APIs-in-Swagger"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="ms-2 text-decoration-none"
                                        >
                                            <i className="bi bi-question-circle-fill text-secondary"></i>
                                        </a>
                                    </Form.Label>
                                    <Form.Control
                                        type="url"
                                        placeholder="Enter Base URL"
                                        name="baseUrl"
                                        value={formData.baseUrl}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                {/* API Token */}
                                <Form.Group className="mb-3" controlId="formApiToken">
                                    <Form.Label className="d-flex align-items-center">
                                        API Token
                                        <a
                                            href="https://developer.cyara.com/hc/en-us/articles/360001183096-Authentication"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="ms-2 text-decoration-none"
                                        >
                                            <i className="bi bi-question-circle-fill text-secondary"></i>
                                        </a>
                                    </Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter API Token"
                                        name="apiToken"
                                        value={formData.apiToken}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                {/* Folder Name */}
                                <Form.Group className="mb-3" controlId="formFolderName">
                                    <Form.Label className="d-flex align-items-center">
                                        Folder Name
                                        <a
                                            href="https://developer.cyara.com/hc/en-us/articles/360001040256-Using-the-Cyara-3-0-APIs-in-Swagger"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="ms-2 text-decoration-none"
                                        >
                                            <i className="bi bi-question-circle-fill text-secondary"></i>
                                        </a>
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Folder Name"
                                        name="folderName"
                                        value={formData.folderName}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                {/* Account ID */}
                                <Form.Group className="mb-3" controlId="formAccountId">
                                    <Form.Label className="d-flex align-items-center">
                                        Account ID
                                        <a
                                            href="https://developer.cyara.com/hc/en-us/articles/360001040256-Using-the-Cyara-3-0-APIs-in-Swagger"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="ms-2 text-decoration-none"
                                        >
                                            <i className="bi bi-question-circle-fill text-secondary"></i>
                                        </a>
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Account ID"
                                        name="accountId"
                                        value={formData.accountId}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <Button
                                    variant="secondary"
                                    type="submit"
                                    className="w-100"
                                    style={{
                                        borderRadius: "8px",
                                        padding: "15px 0",
                                        marginTop: "10px",
                                    }}
                                    disabled={loading} // Disable button while loading
                                >
                                    {loading ? (
                                        <>
                                            <Spinner
                                                as="span"
                                                animation="border"
                                                size="sm"
                                                role="status"
                                                aria-hidden="true"
                                            />{" "}
                                            Getting Data and Generating report...
                                        </>
                                    ) : (
                                        "Submit"
                                    )}
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>


    );
};

export default UserDataForm;
