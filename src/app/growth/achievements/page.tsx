export default function Page() {
  return (
    <div>
      <h1>Achievement Milestones</h1>
      <div
        style={{
          display: 'grid',
          gap: '1rem',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        }}
      >
        {/* Mock achievement cards */}
        <div
          style={{
            padding: '1rem',
            border: '1px solid #eee',
            borderRadius: '8px',
          }}
        >
          <h3>Communication Master</h3>
          <p>Successfully completed 5 feedback sessions</p>
          <div>🏆 Gold Badge</div>
        </div>

        <div
          style={{
            padding: '1rem',
            border: '1px solid #eee',
            borderRadius: '8px',
          }}
        >
          <h3>Team Player</h3>
          <p>Contributed to 3 team projects</p>
          <div>🥈 Silver Badge</div>
        </div>

        <div
          style={{
            padding: '1rem',
            border: '1px solid #eee',
            borderRadius: '8px',
          }}
        >
          <h3>Growth Mindset</h3>
          <p>Completed 10 learning resources</p>
          <div>🥉 Bronze Badge</div>
        </div>

        <div
          style={{
            padding: '1rem',
            border: '1px solid #eee',
            borderRadius: '8px',
            opacity: 0.5,
          }}
        >
          <h3>Leadership Excellence</h3>
          <p>Lead 5 team initiatives</p>
          <div>🔒 Locked</div>
        </div>
      </div>
    </div>
  );
}
