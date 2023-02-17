import React from 'react';
import '../style/components/header.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  render() {
    const { userNome } = this.props;
    return (
      <div>
        <header id="header-component">
          <p data-testid="header-user-name">
            {userNome}
          </p>
          <nav>
            <Link to="/search" className="navHeader"> Pesquisar </Link>
            <Link to="/favorites" className="navHeader">
              músicas favoritas
            </Link>
            <Link to="/profile" className="navHeader"> perfil </Link>
          </nav>
        </header>
      </div>
    );
  }
}
Header.propTypes = {
  userNome: PropTypes.string,
};

Header.defaultProps = {
  userNome: 'string',
};
export default Header;
