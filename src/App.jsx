import ThreeBackground from './components/ThreeBackground'
import AppRoutes from './routes/AppRoutes'

function App() {
  return (
    <div className="relative min-h-screen flex flex-col overflow-x-hidden bg-transparent">
      
      {/* Cybersecurity Canvas Background (Rendered at z-0) */}
      <ThreeBackground />

      {/* Design Background Image Overlay — blended on top of animated canvas */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          backgroundImage: 'url(/design_bg_overlay.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.18,
          mixBlendMode: 'overlay',
        }}
        aria-hidden="true"
      />

      {/* Page Content (Layered above background at z-10) */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <AppRoutes />
      </div>

    </div>
  )
}

export default App