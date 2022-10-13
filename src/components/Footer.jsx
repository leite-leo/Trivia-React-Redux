import React from 'react';
import '../styles/Footer.css';
// import Trybe from './trybe.png';

class Footer extends React.Component {
  render() {
    return (
      <div className="flexFooter">
        <div className="flexFooter">
          <h2>André Sugai</h2>
          <h2>Fabiano de Souza</h2>
          <h2>Leonardo Leite</h2>
          <h2>Talita Saez</h2>
          <h2>Valéria Menezes</h2>
        </div>
        {/* <div className="trybe">
          <img src={ Trybe } alt="Trybe Logo" />
        </div> */}
      </div>
    );
  }
}

export default Footer;
