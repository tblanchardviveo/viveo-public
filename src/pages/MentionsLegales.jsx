export default function MentionsLegales() {
  const ey = { fontFamily: "'Raleway', sans-serif", fontWeight: 500, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.22em', color: '#A67C52', marginBottom: 12 }
  const h2s = { fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 400, fontSize: 'clamp(20px,2.5vw,28px)', color: '#111C33', margin: '8px 0 24px' }
  const txt = { fontFamily: "'Raleway', sans-serif", fontWeight: 300, fontSize: 14, color: '#555', lineHeight: 1.8, margin: '0 0 16px' }
  const gridWrap = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 1, background: 'rgba(17,28,51,0.08)', borderRadius: 3, overflow: 'hidden' }
  const cell = { background: '#fff', padding: '16px 20px' }
  const lbl = { fontFamily: "'Raleway', sans-serif", fontWeight: 500, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'rgba(17,28,51,0.35)', marginBottom: 4 }
  const val = { fontFamily: "'Raleway', sans-serif", fontWeight: 400, fontSize: 14, color: '#111C33', lineHeight: 1.5 }
  const sec = { borderLeft: '2px solid #A67C52', paddingLeft: 32, marginBottom: 56, position: 'relative' }
  const dot = { width: 8, height: 8, borderRadius: '50%', background: '#A67C52', position: 'absolute', left: -5, top: 0 }
  const hr = { height: 1, background: 'linear-gradient(to right, #A67C52, rgba(166,124,82,0.10))', margin: '56px 0', border: 'none' }
  const badge = { display: 'inline-block', background: 'rgba(166,124,82,0.10)', border: '1px solid rgba(166,124,82,0.25)', borderRadius: 2, padding: '6px 12px', fontFamily: "'Raleway', sans-serif", fontWeight: 500, fontSize: 11, letterSpacing: '0.08em', color: '#A67C52', marginTop: 24 }
  const Cell = ({ label, children }) => <div style={cell}><div style={lbl}>{label}</div><div style={val}>{children}</div></div>

  return (
    <>
      {/* HERO */}
      <section style={{ background: 'radial-gradient(ellipse 60% 80% at 100% 50%, rgba(166,124,82,0.07) 0%, transparent 60%), #111C33', padding: '80px 6vw 64px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
          <span style={{ width: 32, height: 1, background: '#A67C52', display: 'block' }} />
          <span style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 500, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.22em', color: '#A67C52' }}>{"Informations légales"}</span>
        </div>
        <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 300, fontSize: 'clamp(36px,5vw,64px)', lineHeight: 1.0, letterSpacing: '-0.02em', color: '#fff', margin: 0 }}>
          Mentions <em style={{ fontStyle: 'italic', color: '#C4976A' }}>{"légales"}</em>
        </h1>
        <p style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 200, fontSize: 14, color: 'rgba(255,255,255,0.35)', marginTop: 16, maxWidth: 480 }}>
          {"Conformément aux articles 6-III et 19 de la Loi n°2004-575 du 21 juin 2004"}
        </p>
      </section>

      {/* CORPS */}
      <section style={{ background: '#F7F5F1', padding: '64px 6vw' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>

          {/* 01 */}
          <div style={sec}>
            <div style={dot} />
            <div style={ey}>{"01 — ÉDITEUR DU SITE"}</div>
            <h2 style={h2s}>{"VIVEO Conseils & Patrimoine"}</h2>
            <div style={gridWrap}>
              <Cell label="Forme juridique">SARL (EURL)</Cell>
              <Cell label="Capital social">{"5 000 €"}</Cell>
              <Cell label={"Siège social"}>{"3 bis Rue du Général de Gaulle — 59253 La Gorgue"}</Cell>
              <Cell label="RCS">{"Dunkerque n°991869900"}</Cell>
              <Cell label={"N° SIRET"}>991 869 900 00019</Cell>
              <Cell label={"N° TVA intracommunautaire"}>FR76991869900</Cell>
            </div>
            <div style={badge}>Carte Professionnelle Transactions</div>
            <div style={{ ...gridWrap, marginTop: 16 }}>
              <Cell label={"Référence Carte T"}>CPI59082025000000003</Cell>
              <Cell label={"Délivrée par"}>CCI Grand Lille</Cell>
              <Cell label={"Validité"}>{"Jusqu'au 11/12/2028"}</Cell>
              <Cell label="RC Professionnelle">{"Allianz Actif Pro — n°64579786"}</Cell>
            </div>
            <p style={{ ...txt, marginTop: 20 }}>Directeur de la publication : Thomas Blanchard</p>
          </div>
          <hr style={hr} />

          {/* 02 */}
          <div style={sec}>
            <div style={dot} />
            <div style={ey}>{"02 — HÉBERGEMENT"}</div>
            <h2 style={h2s}>Infrastructure technique</h2>
            <div style={gridWrap}>
              <Cell label={"Hébergeur DNS"}>{"IONOS SE\n7 place de la Gare — 57200 Sarreguemines"}</Cell>
              <Cell label={"Hébergeur applicatif"}>{"Vercel Inc.\n340 Pine Street, Suite 701\nSan Francisco, CA 94104"}</Cell>
            </div>
          </div>
          <hr style={hr} />

          {/* 03 */}
          <div style={sec}>
            <div style={dot} />
            <div style={ey}>{"03 — PROPRIÉTÉ INTELLECTUELLE"}</div>
            <h2 style={h2s}>{"Droits & contenus"}</h2>
            <p style={txt}>{"L'ensemble du contenu de ce site — textes, images, graphismes, logo, architecture visuelle — est la propriété exclusive de VIVEO Conseils & Patrimoine. Toute reproduction, représentation, modification ou exploitation, totale ou partielle, est strictement interdite sans autorisation écrite préalable."}</p>
            <p style={txt}>{"Les marques et logos présents sur ce site sont des marques déposées. Leur utilisation sans autorisation constitue une contrefaçon sanctionnée par les articles L.713-2 et suivants du Code de la propriété intellectuelle."}</p>
          </div>
          <hr style={hr} />

          {/* 04 */}
          <div style={sec}>
            <div style={dot} />
            <div style={ey}>{"04 — DONNÉES PERSONNELLES"}</div>
            <h2 style={h2s}>Vos droits (RGPD)</h2>
            <p style={txt}>{"Conformément au Règlement Général sur la Protection des Données (RGPD — UE 2016/679) et à la loi Informatique et Libertés, vous disposez d'un droit d'accès, de rectification, de portabilité et de suppression de vos données personnelles."}</p>
            <div style={gridWrap}>
              <Cell label="Responsable du traitement">{"VIVEO Conseils & Patrimoine"}</Cell>
              <Cell label={"Finalité"}>{"Gestion des demandes de contact et de rendez-vous"}</Cell>
              <Cell label={"Durée de conservation"}>{"3 ans à compter du dernier contact"}</Cell>
              <Cell label="Contact"><a href="mailto:contact@viveo-patrimoine.fr" style={{ color: '#A67C52', textDecoration: 'none' }}>contact@viveo-patrimoine.fr</a></Cell>
            </div>
            <p style={{ ...txt, marginTop: 20 }}>{"Pour exercer vos droits ou introduire une réclamation, vous pouvez également contacter la CNIL : "}<a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" style={{ color: '#A67C52' }}>www.cnil.fr</a></p>
          </div>
          <hr style={hr} />

          {/* 05 */}
          <div style={sec}>
            <div style={dot} />
            <div style={ey}>{"05 — COOKIES"}</div>
            <h2 style={h2s}>{"Gestion des préférences"}</h2>
            <p style={txt}>{"Ce site utilise des cookies techniques nécessaires à son bon fonctionnement. Aucun cookie publicitaire ou de traçage tiers n'est déposé sans votre consentement explicite."}</p>
            <p style={txt}>{"Vous pouvez paramétrer vos préférences à tout moment via les paramètres de votre navigateur. Le refus de certains cookies peut affecter votre expérience de navigation."}</p>
          </div>
        </div>
      </section>

      {/* FOOTER BAR */}
      <section style={{ background: '#111C33', padding: '32px 6vw' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <span style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 600, fontSize: 14, color: '#fff', letterSpacing: '0.20em' }}>VIVEO</span>
            <span style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 200, color: '#fff', opacity: 0.50 }}>{" · Patrimoine"}</span>
          </div>
          <span style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 300, fontSize: 11, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.08em' }}>{"Dernière mise à jour : mars 2026"}</span>
        </div>
      </section>
    </>
  )
}
