import React from 'react';
import ProfileEdit from './edit';
import Header from '../components/Header';

class Profile extends React.Component {
  render() {
    return (
      <>
        <Header />
        <div data-testid="page-profile">Profile</div>
        <ProfileEdit />
      </>
    );
  }
}

export default Profile;
