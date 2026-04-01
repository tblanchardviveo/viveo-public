import { useTranslation } from 'react-i18next'

const LANGS = [
  { code: 'fr', flag: '🇫🇷', label: 'FR' },
  { code: 'en', flag: '🇬🇧', label: 'EN' },
  { code: 'de', flag: '🇩🇪', label: 'DE' },
  { code: 'it', flag: '🇮🇹', label: 'IT' },
  { code: 'es', flag: '🇪🇸', label: 'ES' },
  { code: 'nl', flag: '🇳🇱', label: 'NL' },
]

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const current = i18n.language?.slice(0, 2)

  return (
    <div style={{
      background: 'rgba(17,28,51,0.97)',
      borderBottom: '1px solid rgba(166,124,82,0.18)',
      padding: '10px 6vw',
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 8,
    }}>
      {LANGS.map(({ code, flag, label }) => {
        const active = current === code
        return (
          <button
            key={code}
            onClick={() => i18n.changeLanguage(code)}
            style={{
              background: active ? 'rgba(166,124,82,0.15)' : 'transparent',
              border: `1px solid ${active ? '#A67C52' : 'rgba(255,255,255,0.14)'}`,
              borderRadius: 6,
              padding: '5px 10px',
              cursor: 'pointer',
              color: active ? '#A67C52' : 'rgba(255,255,255,0.45)',
              fontFamily: "'Raleway', sans-serif",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.06em',
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              transition: 'all .15s ease',
            }}
          >
            <span>{flag}</span><span>{label}</span>
          </button>
        )
      })}
    </div>
  )
}
