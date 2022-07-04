import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  render() {
    const { userNome } = this.props;
    return (
      <header data-testid="header-component">
        <p data-testid="header-user-name">
          {userNome}
        </p>
        <nav>
          <Link to="/search" data-testid="link-to-search"> Pesquisar </Link>
          <Link to="/favorites" data-testid="link-to-favorites"> músicas favoritas </Link>
          <Link to="/profile" data-testid="link-to-profile"> perfil </Link>
        </nav>
      </header>);
  }
}
Header.propTypes = {
  userNome: PropTypes.string,
};

Header.defaultProps = {
  userNome: 'string',
};
export default Header;
