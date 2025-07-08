import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardView from './components/DashboardView';
import AnomaliesView from './components/AnomaliesView';
import SettingsView from './components/SettingsView';
import LoginView from './components/LoginView';
import RuleEngineView from './components/RuleEngineView';
import { View, User } from './types';
import { setAuthToken, logout } from './services/apiService';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.Dashboard);
  const [user, setUser] = useState<User | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return localStorage.getItem('theme') as 'light' | 'dark' || 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };
  
  const handleLogin = (loggedInUser: User, token: string) => {
    setUser(loggedInUser);
    setAuthToken(token);
    setCurrentView(View.Dashboard);
  };

  const handleLogout = () => {
    setUser(null);
    logout();
    setAuthToken(null);
  };

  const renderView = () => {
    switch (currentView) {
      case View.Dashboard:
        return <DashboardView />;
      case View.Anomalies:
        return <AnomaliesView />;
      case View.Rules:
        return <RuleEngineView />;
      case View.Settings:
        return <SettingsView user={user!} />;
      default:
        return <DashboardView />;
    }
  };

  if (!user) {
    return <LoginView onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-background dark:bg-dark-background text-text-primary dark:text-dark-text-primary font-sans">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={user} theme={theme} toggleTheme={toggleTheme} onLogout={handleLogout} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background dark:bg-dark-background p-6 lg:p-8">
          {renderView()}
        </main>
      </div>
    </div>
  );
};

export default App;