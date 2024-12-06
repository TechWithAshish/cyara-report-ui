import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function Home() {
    return (
        <Container fluid className="py-5 bg-light">
            {/* Hero Section */}
            <Row className="justify-content-center align-items-center text-center bg-secondary text-white py-5 shadow-lg rounded">
                <Col md={8}>
                    <h1 className="display-3 fw-bold mb-4">Welcome to CyaraTools</h1>
                    <p className="lead">
                        Your go-to open-source solution for seamless folder wise report generation and data management. 
                        Bridging the gap in your APIs effortlessly!
                    </p>
                    <Button as={Link} to="/report" variant="light" size="lg" className="fw-bold shadow">
                        Start Generating Folder Reports
                    </Button>
                </Col>
            </Row>

            {/* Features Section */}
            <Container className="mt-5">
                <Row className="text-center">
                    <Col>
                        <h2 className="fw-bold">Why Choose CyaraTools?</h2>
                        <p className="text-muted">
                            Explore the features that make CyaraTools the ideal choice for report generation and API integration.
                        </p>
                    </Col>
                </Row>

                <Row className="g-4">
                    <Col md={4}>
                        <Card className="h-100 shadow-sm">
                            <Card.Body className="text-center">
                                <i className="bi bi-gear-wide-connected text-primary display-4 mb-3"></i>
                                <Card.Title className="fw-bold">Easy Integration</Card.Title>
                                <Card.Text>
                                    Effortlessly connect with APIs to generate folder wise reports or manage your data with minimal setup.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="h-100 shadow-sm">
                            <Card.Body className="text-center">
                                <i className="bi bi-code-slash text-primary display-4 mb-3"></i>
                                <Card.Title className="fw-bold">Open Source</Card.Title>
                                <Card.Text>
                                    Built for the community, CyaraTools offers transparency, flexibility, and collaboration opportunities.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="h-100 shadow-sm">
                            <Card.Body className="text-center">
                                <i className="bi bi-sliders text-primary display-4 mb-3"></i>
                                <Card.Title className="fw-bold">Customizable Reports</Card.Title>
                                <Card.Text>
                                    Generate and tweak reports to fit your specific needs, providing quick and actionable insights.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            {/* Call to Action */}
            <Row className="mt-5 text-center bg-secondary text-white py-5 rounded">
                <Col>
                    <h3 className="fw-bold">Get Started Today</h3>
                    <p>CyaraTools is free, open-source, and designed to simplify your workflows. Don’t wait—try it now!</p>
                    <Button as={Link} to="/report" variant="light" size="lg" className="fw-bold shadow">
                        Generate Your First Report
                    </Button>
                </Col>
            </Row>

            {/* Footer Section */}
            <Row className="mt-5">
                <Col className="text-center">
                    <p className="text-muted">&copy; 2024 CyaraTools. All rights reserved.</p>
                </Col>
            </Row>
        </Container>
    );
}

export default Home;
