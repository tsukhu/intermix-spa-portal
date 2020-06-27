import React from 'react';
import { getAppStatus, MOUNTED, NOT_LOADED } from 'single-spa';
import '../styles/sass/main.scss?modules=false';
import NotFound from './components/not-found';

export default function Root(props) {
  const [status, setStatus] = React.useState(NOT_LOADED);
  window.addEventListener('single-spa:first-mount', () => {
    setStatus(MOUNTED);
  });

  React.useEffect(() => {
    const status = getAppStatus('@intermix/layout');
    setStatus(status);
  }, []);

  return <>{status === MOUNTED && <NotFound />}</>;
}
