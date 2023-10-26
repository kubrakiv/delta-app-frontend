import React from "react";
import { Image, Container, Row, Col } from "react-bootstrap";
import images from "../img/images";

function MainPicture() {
    return (
        <div className="carousel-main">
            <Container id="img_container">
                <Row>
                    <Col>
                        {images.map((image, index) => (
                            <Image
                                as="img"
                                key={index}
                                src={image.logo}
                                rounded
                                // className="mt 5"
                            />
                        ))}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default MainPicture;
