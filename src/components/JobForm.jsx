import React, { Component } from 'react'

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
        this.props.addJob(this.state.puesto, this.state.empresa, this.state.ciudad, this.state.pais);
        this.setState({
            puesto: '',
            empresa: '',
            ciudad: '',
            pais: ''
        })
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <input
                    type="text"
                    name="puesto"
                    placeholder="Nombre del puesto"
                    onChange={this.onChange}
                    value={this.state.puesto}
                />
                <input
                    type="text"
                    name="empresa"
                    placeholder="Nombre de la empresa"
                    onChange={this.onChange}
                    value={this.state.empresa}
                />
                <input
                    type="text"
                    name="ciudad"
                    placeholder="Ciudad"
                    onChange={this.onChange}
                    value={this.state.ciudad}
                />
                <input
                    type="text"
                    name="pais"
                    placeholder="Pais"
                    onChange={this.onChange}
                    value={this.state.pais}
                />
                <input type="submit" value="submit" />
            </form>
        )
    }
}
