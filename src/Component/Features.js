import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const Features = () => {
    const features = [
        {
            title: "Fills the Missing Gap",
            description: "CyaraTools addresses the missing report generation functionality in the parent product, empowering users with detailed, customizable reports.",
            icon: "bi bi-patch-plus-fill", // Use a relevant icon from Bootstrap Icons
        },
        {
            title: "Completely Open Source",
            description: "Our codebase is freely available on GitHub, allowing users to contribute, customize, and enhance the platform.",
            icon: "bi bi-code-slash",
        },
        {
            title: "User-Friendly Interface",
            description: "Designed with simplicity in mind, CyaraTools ensures that users can generate reports effortlessly, regardless of technical expertise.",
            icon: "bi bi-ui-checks",
        },
        {
            title: "Customizable Reports",
            description: "Tailor your reports to suit your specific requirements with our flexible and adaptable platform.",
            icon: "bi bi-sliders",
        },
        {
            title: "Forever Free",
            description: "CyaraTools is free for everyone—no hidden fees, no subscriptions, just powerful tools at your fingertips.",
            icon: "bi bi-gift",
        },
        {
            title: "Active Community Support",
            description: "Join our vibrant community of contributors and users to collaborate and build innovative solutions.",
            icon: "bi bi-people",
        },
    ];

    return (
        <Container className="mt-5">
            <Row className="text-center mb-4">
                <h2 className="fw-bold">Why Choose CyaraTools?</h2>
                <p className="text-muted">
                    Discover the unique features that set CyaraTools apart from the competition.
                </p>
            </Row>
            <Row className="g-4">
                {features.map((feature, index) => (
                    <Col md={6} lg={4} key={index}>
                        <Card className="h-100 shadow-sm border-0">
                            <Card.Body className="text-center">
                                <i
                                    className={`${feature.icon} text-primary mb-3`}
                                    style={{ fontSize: "2.5rem" }}
                                ></i>
                                <Card.Title className="fw-bold">{feature.title}</Card.Title>
                                <Card.Text className="text-muted">
                                    {feature.description}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Features;
