import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const AboutUs = () => {
    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card className="shadow-lg p-4" style={{ borderRadius: "15px" }}>
                        <Card.Body>
                            <h1 className="text-center mb-4">About CyaraTools</h1>
                            <p>
                                Welcome to <strong>CyaraTools</strong> – your ultimate open-source solution for streamlined report generation. 
                                CyaraTools was born out of the need to fill a critical gap in parent product APIs, 
                                enabling users to create detailed, accurate, and customizable reports with ease.
                            </p>
                            <h4 className="mt-4">Our Mission</h4>
                            <p>
                                At CyaraTools, we believe in empowering developers and businesses with tools that 
                                simplify workflows. Our mission is to provide a completely free, accessible, and user-friendly 
                                platform for generating reports, saving time and effort while maintaining precision.
                            </p>
                            <h4 className="mt-4">Why Choose CyaraTools?</h4>
                            <ul>
                                <li><strong>Open Source:</strong> Built for the community, by the community.</li>
                                <li><strong>Comprehensive Features:</strong> Handles missing functionalities with seamless integration.</li>
                                <li><strong>Customizable:</strong> Adapt CyaraTools to suit your specific reporting needs.</li>
                                <li><strong>Free Forever:</strong> No hidden charges, no licensing fees.</li>
                            </ul>
                            <h4 className="mt-4">Our Vision</h4>
                            <p>
                                We envision a world where technical tools like CyaraTools empower individuals and organizations 
                                to focus on their core objectives, leaving the complexity of reporting to us. 
                                Together, let's make innovation accessible and reporting effortless.
                            </p>
                            <h4 className="mt-4">Get Involved</h4>
                            <p>
                                As an open-source project, we welcome contributions and feedback. Whether you're a developer, 
                                a tester, or a user with suggestions, we invite you to collaborate with us. 
                                Check out our GitHub repository to learn more!
                            </p>
                            <div className="text-center mt-4">
                                <a
                                    href="https://github.com/YourRepositoryLink" // Replace with actual link
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-secondary"
                                >
                                    Visit Our GitHub
                                </a>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default AboutUs;
