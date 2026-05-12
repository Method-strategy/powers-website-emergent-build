import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import { useLegacyLinkIntercept, useScrollToTopOnNav } from '../lib/navHooks';

export default function Layout() {
  useLegacyLinkIntercept();
  useScrollToTopOnNav();
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  useEffect(() => {
    if (isHome) {
      document.body.classList.remove('pw-has-fixed-header');
    } else {
      document.body.classList.add('pw-has-fixed-header');
    }
    return () => document.body.classList.remove('pw-has-fixed-header');
  }, [isHome]);

  return (
    <>
      <SiteHeader fixed={!isHome} />
      <Outlet />
      <SiteFooter />
    </>
  );
}
