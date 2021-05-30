import React, { Component } from 'react';
import { Card, Button, CardGroup } from 'react-bootstrap';


export default class Cards extends Component {

    render(){
        return(
            <CardGroup>
                <Card border="success" style={{ width: '18rem' }}>
                    <Card.Header>{this.props.job.position}</Card.Header>
                    <Card.Body>
                    <Card.Title>{this.props.job.description}</Card.Title>
                    </Card.Body>
                    <Button variant="danger" onClick={() => this.props.deleteJob(this.props.id)}>
                        Delete position
                    </Button>
                </Card>
            </CardGroup>
        );
    }
}