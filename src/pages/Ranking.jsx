import React from 'react';
import { Link } from 'react-router-dom';

class Ranking extends React.Component {
  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <Link to="/" data-testid="btn-go-home">Voltar para Login</Link>
      </div>
    );
  }
}

export default Ranking;
