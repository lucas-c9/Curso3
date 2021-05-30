import { Jumbotron, Container} from 'react-bootstrap';
const Title = ({message}) => {

    return( 
        <Jumbotron fluid>
            <Container>
                <h1>{message}</h1>
            </Container>
        </Jumbotron>
    )
}

export default Title;
