import React from 'react';

class Buscador extends React.Component {
    state = {  }

    busquedaRef = React.createRef();

    obtenerDatos = e => {
        e.preventDefault();

        const termino = this.busquedaRef.current.value;
        this.props.datosBusqueda(termino)
    }

    render() { 
        return ( 
            <form onSubmit={this.obtenerDatos}>
                <div className='row'>
                    <div className='form-control col-md-8'>
                        <input className='form-control form-control-lg' ref={this.busquedaRef} type='text' placeholder='Busca tu Imagen, ejemplo: Playa' />
                    </div>
                    <div className='form-control col-md-4'>
                       <input type='submit' className='btn btn-danger btn-block' value='Buscar'/>
                    </div>
                </div>
            </form>
         );
    }
}
 
export default Buscador;