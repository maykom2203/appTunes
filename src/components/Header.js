import React from 'react';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { userNome } = this.props;
    return (
      <header data-testid="header-component">
        {' '}
        <p data-testid="header-user-name">
          {userNome}
        </p>
        {' '}
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
