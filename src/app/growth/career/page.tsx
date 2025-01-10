export default function Page() {
  return (
    <div>
      <h1>Career Progression</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* Career Roadmap Section */}
        <section>
          <h2>Your Career Roadmap</h2>
          <div
            style={{
              padding: '2rem',
              border: '1px solid #eee',
              borderRadius: '8px',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <div>
              <h3>Current Role: Software Engineer</h3>
              <p>Focus areas based on recent feedback:</p>
              <ul>
                <li>Technical Leadership</li>
                <li>System Design</li>
                <li>Mentoring Junior Developers</li>
              </ul>
            </div>

            <div>
              <h3>Next Career Milestone</h3>
              <div
                style={{
                  padding: '1rem',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '4px',
                }}
              >
                <h4>Senior Software Engineer</h4>
                <p>Required competencies:</p>
                <ul>
                  <li>Lead technical initiatives ⏳</li>
                  <li>Architecture decision making ⏳</li>
                  <li>Cross-team collaboration ✅</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Development Plan */}
        <section>
          <h2>Development Plan</h2>
          <div
            style={{
              display: 'grid',
              gap: '1rem',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            }}
          >
            <div
              style={{
                padding: '1rem',
                border: '1px solid #eee',
                borderRadius: '8px',
              }}
            >
              <h3>Short-term Goals</h3>
              <ul>
                <li>Complete system design workshop</li>
                <li>Lead next sprint planning</li>
                <li>Mentor 2 junior developers</li>
              </ul>
            </div>

            <div
              style={{
                padding: '1rem',
                border: '1px solid #eee',
                borderRadius: '8px',
              }}
            >
              <h3>Long-term Goals</h3>
              <ul>
                <li>Technical lead certification</li>
                <li>Architecture specialization</li>
                <li>Team leadership role</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
