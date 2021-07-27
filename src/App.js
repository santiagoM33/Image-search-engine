import React from 'react';
import './App.css';
import Buscador from './components/Buscador';
import Resultado from './components/Resultado';

class App extends React.Component {

  state = {
    termino: '',
    imagenes: [],
    pagina: '',
    cargando: false,
    totalPaginas: ''
  }

  consultarAPI = async () => {
    const termino = this.state.termino;
    const pagina = this.state.pagina;
    const BASEURL = `https://pixabay.com/api/?key=12793205-4f67bc10c85eddd5e80554310&q=${termino}&per_page=32&page=${pagina}`;
    await fetch(BASEURL)
      .then(res=> {
        this.setState({cargando: true})
        return res.json()
      })
      .then(imagenes=> {
        const totalPaginacion = Math.ceil(imagenes.totalHits / 32);
        setTimeout(() => {
          this.setState({
            imagenes,
            cargando: false,
            totalPaginas: totalPaginacion
          })
        }, 2000);
      })
  }

  datosBusqueda = termino => {
    this.setState({termino, pagina: 1}, () => {
      this.consultarAPI()
    })
  }

  paginaAnterior = () => {
    let pagina = Number(this.state.pagina);
    if(pagina === 1) return null;
    pagina -= 1;
    this.setState({pagina}, () => {
      this.consultarAPI();
      this.scroll();
    })
  }

  paginaSiguiente = () => {
    let pagina = Number(this.state.pagina);
    const {totalPaginas} = this.state;
    if(pagina === totalPaginas) return null;
    pagina += 1;
    this.setState({pagina}, () => {
      this.consultarAPI();
      this.scroll();
    })
  }

  scroll = () =>{
    const elemento = document.querySelector('.jumbotron');
    elemento.scrollIntoView('smooth', 'start');
  }

  render(){
    const cargando = this.state.cargando;
    const {hits} = this.state.imagenes;
    let resultado;
    if(cargando){
      resultado = <div class="sk-chase">
                    <div class="sk-chase-dot"></div>
                    <div class="sk-chase-dot"></div>
                    <div class="sk-chase-dot"></div>
                    <div class="sk-chase-dot"></div>
                    <div class="sk-chase-dot"></div>
                    <div class="sk-chase-dot"></div>
                  </div>
    } else {
      resultado = <Resultado 
                    imagenes={hits} 
                    paginaAnterior={this.paginaAnterior} 
                    paginaSiguiente={this.paginaSiguiente}
                    pagina={this.state.pagina}
                    totalPaginas={this.state.totalPaginas}
                  />
    }
    return (
      <div className="container">
        <div className='jumbotron'>
          <p className='lead text-center'>Buscador de Imagenes</p>
          <Buscador datosBusqueda={this.datosBusqueda}/>
        </div>
        <div className='row'>
          {resultado}
        </div>
      </div>
    );
  }
}

export default App;
