import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Job extends Component {
    render(){
        const {id, puesto, empresa, ciudad, pais} = this.props.job;
        return(
            <div class="card">
                <div class="card-body">
                <h5 class="card-title">{puesto}</h5>
                <h6 class="card-subtitle mb-2 text-muted">{empresa}</h6>
                <p class="card-text">{ciudad} - {pais}</p>
                <button
                onClick={this.props.deleteJob.bind(this, id)}
                className="btn btn-danger float-right">
                Eliminar
                </button>
                </div>
            </div>
        );
    }
}

Job.propTypes = {
    jobs: PropTypes.object.isRequired
}