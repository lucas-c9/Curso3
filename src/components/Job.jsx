import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Job extends Component {
    render(){
        const {id, puesto, empresa, ciudad, pais} = this.props.job;
        return(
            <p>
                {puesto} - {empresa} - {ciudad} - {pais}
                <button style={btnDeleteStyle} onClick={this.props.deleteJob.bind(this, id)}>X</button>
            </p>
        );
    }
}

Job.propTypes = {
    jobs: PropTypes.object.isRequired
}

const btnDeleteStyle = {
    fontSize: '18px',
    background: '#EA2027',
    color: '#fff',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '50%',
    cursor: 'pointer',
    float: 'right'
}