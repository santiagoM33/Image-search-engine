import React from 'react';
import Imagen from './Imagen';
import Paginacion from './Paginacion';

class Resultado extends React.Component {
    state = {  }

    mostrarImagenes = () => {
        if(!this.props.imagenes) return null;
       //const imagenes = this.props.imagenes;
       return (
           <React.Fragment>
               <div className='col-12 p-5 row'>
                    {this.props.imagenes.map((imagen)=> {
                       return <Imagen key={imagen.id} imagen={imagen}/>
                    })}
               </div>
               <Paginacion 
                paginaAnterior={this.props.paginaAnterior} 
                paginaSiguiente={this.props.paginaSiguiente}
                pagina={this.props.pagina}
                totalPaginas={this.props.totalPaginas} 
               />
           </React.Fragment>
       )
    }

    render() { 
        return ( 
            <React.Fragment>
                {this.mostrarImagenes()}
            </React.Fragment>
         );
    }
}
 
export default Resultado;