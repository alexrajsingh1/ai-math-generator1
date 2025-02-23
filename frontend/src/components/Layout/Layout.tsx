import React from 'react';

const styles = {
  container: {
    minHeight: '100vh',
    background: '#f3f4f6'
  },
  header: {
    background: 'white',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    position: 'sticky' as const,
    top: 0,
    zIndex: 100
  },
  headerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '16px',
    textAlign: 'center' as const 
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#111827'
  },
  main: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '24px 16px'
  }
};

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.title}>🎓 AI Math Question Generator ✨</h1>
        </div>
      </header>
      <main style={styles.main}>
        {children}
      </main>
    </div>
  );
};
