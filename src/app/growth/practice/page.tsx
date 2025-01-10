export default function Page() {
  return (
    <div>
      <h1>Practice Scenarios</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* Current Focus Areas */}
        <section>
          <h2>Your Focus Areas</h2>
          <div
            style={{
              display: 'grid',
              gap: '1rem',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            }}
          >
            <div
              style={{
                padding: '1.5rem',
                border: '1px solid #eee',
                borderRadius: '8px',
              }}
            >
              <h3>Technical Leadership</h3>
              <p>Practice leading technical discussions and decision-making</p>
              <div
                style={{
                  marginTop: '1rem',
                  padding: '0.5rem',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '4px',
                }}
              >
                3 scenarios available
              </div>
            </div>

            <div
              style={{
                padding: '1.5rem',
                border: '1px solid #eee',
                borderRadius: '8px',
              }}
            >
              <h3>System Design</h3>
              <p>Work through real-world architecture challenges</p>
              <div
                style={{
                  marginTop: '1rem',
                  padding: '0.5rem',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '4px',
                }}
              >
                5 scenarios available
              </div>
            </div>

            <div
              style={{
                padding: '1.5rem',
                border: '1px solid #eee',
                borderRadius: '8px',
              }}
            >
              <h3>Code Review</h3>
              <p>Enhance your code review and feedback skills</p>
              <div
                style={{
                  marginTop: '1rem',
                  padding: '0.5rem',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '4px',
                }}
              >
                4 scenarios available
              </div>
            </div>
          </div>
        </section>

        {/* Recent Practice History */}
        <section>
          <h2>Recent Practice History</h2>
          <div
            style={{
              padding: '1.5rem',
              border: '1px solid #eee',
              borderRadius: '8px',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem',
                backgroundColor: '#f8f9fa',
                borderRadius: '4px',
              }}
            >
              <div>
                <h4>System Design: Microservices Architecture</h4>
                <div style={{ color: '#666' }}>Completed 2 days ago</div>
              </div>
              <div style={{ color: 'green' }}>Score: 85%</div>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem',
                backgroundColor: '#f8f9fa',
                borderRadius: '4px',
              }}
            >
              <div>
                <h4>Technical Leadership: Team Planning</h4>
                <div style={{ color: '#666' }}>Completed 5 days ago</div>
              </div>
              <div style={{ color: 'green' }}>Score: 90%</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
