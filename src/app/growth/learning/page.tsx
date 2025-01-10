export default function Page() {
  return (
    <div>
      <h1>Learning Resources</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* Featured Learning Paths */}
        <section>
          <h2>Featured Learning Paths</h2>
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
              <h3>Technical Leadership</h3>
              <p>Learn to lead technical initiatives and mentor others</p>
              <div style={{ color: '#666' }}>5 modules • 3 hours</div>
            </div>

            <div
              style={{
                padding: '1rem',
                border: '1px solid #eee',
                borderRadius: '8px',
              }}
            >
              <h3>System Design</h3>
              <p>Master architectural patterns and scalable solutions</p>
              <div style={{ color: '#666' }}>4 modules • 2.5 hours</div>
            </div>

            <div
              style={{
                padding: '1rem',
                border: '1px solid #eee',
                borderRadius: '8px',
              }}
            >
              <h3>Effective Communication</h3>
              <p>Enhance your technical communication skills</p>
              <div style={{ color: '#666' }}>3 modules • 1.5 hours</div>
            </div>
          </div>
        </section>

        {/* Recommended Resources */}
        <section>
          <h2>Recommended Resources</h2>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <div
              style={{
                padding: '1rem',
                border: '1px solid #eee',
                borderRadius: '8px',
                display: 'flex',
                gap: '1rem',
                alignItems: 'center',
              }}
            >
              <div style={{ flex: 1 }}>
                <h3>System Design Interview Guide</h3>
                <p>Comprehensive guide to ace system design discussions</p>
                <div style={{ color: '#666' }}>Article • 15 min read</div>
              </div>
              <button
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#228be6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Read Now
              </button>
            </div>

            <div
              style={{
                padding: '1rem',
                border: '1px solid #eee',
                borderRadius: '8px',
                display: 'flex',
                gap: '1rem',
                alignItems: 'center',
              }}
            >
              <div style={{ flex: 1 }}>
                <h3>Mentoring Best Practices</h3>
                <p>
                  Learn effective techniques for mentoring junior developers
                </p>
                <div style={{ color: '#666' }}>Video • 25 min</div>
              </div>
              <button
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#228be6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Watch Now
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
