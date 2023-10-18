import React from "react";
import { Row, Container } from "react-bootstrap";

import { WeekPlannerTest } from "../components/WeekPlanner/WeekPlannerTest";

function PlanScreenTest() {
    return (
        <Container>
            <Row>
                <WeekPlannerTest />
            </Row>
        </Container>
    );
}

export default PlanScreenTest;
