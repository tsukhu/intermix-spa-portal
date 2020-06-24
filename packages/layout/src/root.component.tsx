import React from 'react';
import '../styles/global.scss';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import SideBar from './components/side-bar';
import HeaderDesktop from './components/header-desktop';
import HeaderMobile from './components/header-mobile';

export default function Root(props) {
  return (
    <BrowserRouter basename="/">
      <div className="w-full flex h-screen overflow-y-hidden">
        <SideBar />
        <div className="w-full flex flex-col h-screen overflow-y-hidden">
          <HeaderDesktop />
          <HeaderMobile />
        </div>
      </div>
      <Route exact path="/">
        <Redirect to="/dashboard" />
      </Route>
    </BrowserRouter>
  );
}
