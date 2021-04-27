import React, { Component } from 'react';
import '../utils/validations';
import { checkInput } from '../utils/validations';

export default class JobForm extends Component {

    state = {
        puesto: '',
        empresa: '',
        ciudad: '',
        pais: ''
    }
    onChange = (e) => this.setState({
        [e.target.name]: e.target.value
    })

    onSubmit = e => {
        e.preventDefault();
        if(checkInput(this.state.puesto)
            && checkInput(this.state.empresa)
            && checkInput(this.state.ciudad)
            && checkInput(this.state.pais)
        ){
            this.props.addJob(this.state.puesto, this.state.empresa, this.state.ciudad, this.state.pais);
            this.setState({
                puesto: '',
                empresa: '',
                ciudad: '',
                pais: ''
            })
        }
        else{
            return;
        }
    }

    render() {
        return (
            <div className="container">
            <form onSubmit={this.onSubmit}>
                <input
                    className="form-control"
                    type="text"
                    name="puesto"
                    placeholder="Nombre del puesto"
                    onChange={this.onChange}
                    value={this.state.puesto}
                />
                <input
                    className="form-control"
                    type="text"
                    name="empresa"
                    placeholder="Nombre de la empresa"
                    onChange={this.onChange}
                    value={this.state.empresa}
                />
                <input
                    className="form-control"
                    type="text"
                    name="ciudad"
                    placeholder="Ciudad"
                    onChange={this.onChange}
                    value={this.state.ciudad}
                />
                <input
                    className="form-control"
                    type="text"
                    name="pais"
                    placeholder="Pais"
                    onChange={this.onChange}
                    value={this.state.pais}
                />
                <input className="btn btn-dark bg-dark btn-add mt-2 mb-4" type="submit" value="Agregar puesto" />
            </form>
            </div>
        )
    }
}
