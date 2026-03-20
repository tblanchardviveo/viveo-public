export default function DemoEspaceClient() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: '#fff' }}>
      <iframe
        src="/demo-espace-client-viveo.html"
        title="Demo Espace Client VIVEO"
        style={{ width: '100%', height: '100%', border: 'none' }}
      />
    </div>
  )
}
