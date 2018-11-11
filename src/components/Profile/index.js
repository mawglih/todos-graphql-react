import React from 'react';
import UserInfo from './UserInfo';
import UserTodos from './UserTodos';
import AuthGuard from '../AuthCuard';

const Profile = ({ session }) => (
  <div>
    <UserInfo session={session} />
    <UserTodos username={session.getCurrentUser.username} />
  </div>
);

export default AuthGuard(session => session && session.getCurrentUser)(Profile);
