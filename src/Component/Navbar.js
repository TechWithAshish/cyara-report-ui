import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function CustomNavbar() {
    const [showOffcanvas, setShowOffcanvas] = useState(false);

    const handleCloseOffcanvas = () => setShowOffcanvas(false);
    const handleShowOffcanvas = () => setShowOffcanvas(true);

    const NavbarStyle = {
        backgroundColor: '#343a40',
        color: 'white'
    };

    return (
        <>
            {['xxl'].map((expand) => (
                <Navbar key={expand} expand={expand} className="bg-secondary" style={NavbarStyle}>
                    <Container fluid className="container-fluid p-1 ms-3 me-3">
                        <Navbar.Brand as={Link} to="/" className="fw-bold">CyaraTools</Navbar.Brand>
                        <Navbar.Toggle
                            aria-controls={`offcanvasNavbar-expand-${expand}`}
                            onClick={handleShowOffcanvas} // Open the Offcanvas
                        />
                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                            placement="end"
                            show={showOffcanvas} // Control visibility
                            onHide={handleCloseOffcanvas} // Close the Offcanvas
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                    CyaraTools
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav className="justify-content-end flex-grow-1 pe-3">
                                    <Nav.Link
                                        as={Link}
                                        to="/"
                                        className="fw-bold"
                                        onClick={handleCloseOffcanvas} // Close on click
                                    >
                                        Home
                                    </Nav.Link>
                                    <Nav.Link
                                        as={Link}
                                        to="/demo-report"
                                        className="fw-bold"
                                        onClick={handleCloseOffcanvas} // Close on click
                                    >
                                        SampleReport
                                    </Nav.Link>
                                    <Nav.Link
                                        as={Link}
                                        to="/report"
                                        className="fw-bold"
                                        onClick={handleCloseOffcanvas} // Close on click
                                    >
                                        Report
                                    </Nav.Link>

                                    <NavDropdown
                                        title="More"
                                        id={`offcanvasNavbarDropdown-expand-${expand}`}
                                        className="fw-bold"
                                    >
                                        <NavDropdown.Item
                                            as={Link}
                                            to='/about'
                                            onClick={handleCloseOffcanvas} // Close on click
                                        >
                                            About us
                                        </NavDropdown.Item>
                                        <NavDropdown.Item
                                            as={Link}
                                            to="/feature"
                                            onClick={handleCloseOffcanvas} // Close on click
                                        >
                                            Feature
                                        </NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item
                                            href="https://cyaraportal.us/cyarawebapi/swagger/index.html?url=/cyarawebapi/swagger/v3/swagger.json"
                                            target='_blank'
                                            onClick={handleCloseOffcanvas} // Close on click
                                        >
                                            What we use
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                                <Form className="d-flex">
                                    <Form.Control
                                        type="search"
                                        placeholder="Search"
                                        className="me-2"
                                        aria-label="Search"
                                    />
                                    <Button variant="outline-dark" className="fw-bold">Search</Button>
                                </Form>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            ))}
        </>
    );
}

export default CustomNavbar;
