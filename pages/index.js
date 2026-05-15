export default function Home() {
  return (
    <main
      style={{
        fontFamily:
          'system-ui, -apple-system, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        flexDirection: 'column',
        gap: '16px',
        padding: '24px',
        textAlign: 'center',
        color: '#1a1a18',
        background: '#f5f5f3',
      }}
    >
      <h1 style={{ margin: 0, fontSize: '28px', fontWeight: 600 }}>
        Hello from Faust on WP Engine Atlas.
      </h1>
      <p style={{ margin: 0, fontSize: '15px', color: '#3a3a38' }}>
        powers-faust-test. Pipeline validation only. No WordPress connected yet.
      </p>
    </main>
  );
}
