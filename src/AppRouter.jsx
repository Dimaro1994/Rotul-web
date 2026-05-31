import React, { useState, useEffect } from 'react';
import App from './App';
import Dashboard from './components/Dashboard';

export default function AppRouter() {
  const [showDashboard, setShowDashboard] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setShowDashboard(params.get('admin') === 'dashboard');
  }, []);

  if (showDashboard) {
    return <Dashboard />;
  }

  return <App />;
}
