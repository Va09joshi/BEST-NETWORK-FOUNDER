import React from 'react';

export default function FoundersLetter() {
  return (
    <section className="section" style={{ backgroundColor: 'var(--color-stone-canvas)', padding: '140px 20px' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>

        <div className="card" style={{
          maxWidth: '700px',
          width: '100%',
          padding: '48px 56px',
          backgroundColor: 'var(--color-pure-white)',
          textAlign: 'left',
          border: '1px solid var(--color-stone-border)',
          boxShadow: 'var(--shadow-xl)'
        }}>

          <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--color-ink-black)', marginBottom: '8px' }}>
            Greetings to you,
          </h3>
          <p className="text-warm" style={{ fontSize: '18px', marginBottom: '32px' }}>
            wanderer from 🇮🇳 India.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', color: 'var(--color-warm-gray)', fontSize: '16px', lineHeight: '1.7' }}>
            <p>
              Every mobile user should have access to transparent network data. It's essential.
            </p>
            <p>
              But it's not always easy to find the truth. For us, it was either relying on biased marketing, or using overly complex technical tools. That's why we've cherry-picked the most important performance metrics and carefully crafted them into <strong>one minimalistic tool</strong>, Best SIM.
            </p>
            <p>
              Think of <strong style={{ color: 'var(--color-ink-black)' }}>Speedtest.net</strong>, but actually localized and actionable.<br />
              A tool you'll actually use before buying your next SIM card.
            </p>
            <p>
              If you're interested in trying out our platform but not sure where to start, feel free to explore the interactive map or reach out to us via <a href="#" style={{ color: 'var(--color-cyan-signal)', textDecoration: 'none' }}>twitter</a> or <a href="#" style={{ color: 'var(--color-cyan-signal)', textDecoration: 'none' }}>email</a>.
            </p>
            <p>
              Looking forward to having you on board!
            </p>
          </div>

          <div style={{ marginTop: '48px', paddingTop: '32px', borderTop: '1px solid var(--color-stone-border)' }}>
            <p className="text-warm mb-2" style={{ fontSize: '16px' }}>Gratefully,</p>

            {/* Signature Simulation */}
            <div style={{ fontSize: '36px', fontFamily: '"Caveat", "Dancing Script", cursive', color: 'var(--color-ink-black)', marginBottom: '24px', letterSpacing: '-1px' }}>
              The Team <span style={{ fontSize: '20px', fontFamily: 'var(--font-inter)', color: 'var(--color-warm-gray)', marginLeft: '8px' }}>from Best SIM</span>
            </div>

            <p className="text-ash-gray" style={{ fontSize: '14px' }}>
              P.S. Best SIM is completely <span style={{ color: 'var(--color-cyan-signal)' }}>free</span> to use.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
