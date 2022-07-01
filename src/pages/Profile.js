import React from 'react';
import ProfileEdit from './edit';

class Profile extends React.Component {
  render() {
    return (
      <>
        <div data-testid="page-profile">Profile</div>
        <ProfileEdit />
      </>
    );
  }
}

export default Profile;
