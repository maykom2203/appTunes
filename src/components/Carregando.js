import React from 'react';
import '../style/components/carregando.css';

class Carregando extends React.Component {
  render() {
    return (
      <div className="carrAling">
        <svg viewBox="25 25 50 50">
          <circle r="20" cy="50" cx="50" />
        </svg>
      </div>);
  }
}

export default Carregando;
