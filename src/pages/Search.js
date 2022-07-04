import React from 'react';
import Header from '../components/Header';
import Carregando from '../components/Carregando';
import { getUser } from '../services/userAPI';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      loagin: true,
      nomeUser: '',
    };
  }

  componentDidMount() {
    this.rendComponent();
  }

rendComponent = async () => {
  const user = await getUser();
  this.setState({ loagin: false, nomeUser: user.name });
}

render() {
  const { loagin, nomeUser } = this.state;
  return (
    <div data-testid="page-search">
      <Header userNome={ nomeUser } />

      {loagin ? <Carregando /> : (
        <p>
          conteudo
        </p>
      )}
    </div>);
}
}

export default Search;
