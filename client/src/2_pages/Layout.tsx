import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../3_widgets/NavBar/NavBar';

export default function Layout(): React.JSX.Element {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
}
