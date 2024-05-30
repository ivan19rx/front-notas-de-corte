import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const NotFound = () => {
    return (
        <Container className="mt-5">
            <Row>
                <Col md={{ span: 6, offset: 3 }} className="text-center">
                    <h1 className="display-4">404</h1>
                    <p className="lead">Desculpe, a página que você está procurando não foi encontrada.</p>
                    
                    <Button variant="primary" href="/">Voltar para a página inicial</Button>
                </Col>
            </Row>
        </Container>
    );
};

export default NotFound;
