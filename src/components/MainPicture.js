import React from "react";
import { Image, Container, Row, Col } from "react-bootstrap";
import images from "../img/images";

function MainPicture() {
    return (
        <div className="carousel-main">
            <Container id="img_container">
                <Row>
                    {images.map((image, index) => (
                        <Col>
                            <Image
                                as="img"
                                key={index}
                                src={image.logo}
                                rounded
                            />
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
}

export default MainPicture;
