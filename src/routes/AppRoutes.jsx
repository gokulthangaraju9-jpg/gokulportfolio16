import { Navigate, Route, Routes } from 'react-router-dom'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import About from '../pages/About'
import Certifications from '../pages/Certifications'
import CodingProfiles from '../pages/CodingProfiles'
import FeaturedProject from '../pages/FeaturedProject'
import Hero from '../pages/Hero'
import HomeFlow from '../pages/HomeFlow'
import Projects from '../pages/Projects'
import Skills from '../pages/Skills'
import SocialLinks from '../pages/SocialLinks'
import Design from '../pages/Design'
import GraphicDesign from '../pages/GraphicDesign'
import VideoEditor from '../pages/VideoEditor'

const AppRoutes = () => {
  return (
    <>
      <Navigation />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<HomeFlow />} />
          <Route path="/about" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/featured-project" element={<FeaturedProject />} />
          <Route path="/certifications" element={<Certifications />} />
          <Route path="/coding-profiles" element={<CodingProfiles />} />
          <Route path="/social" element={<SocialLinks />} />
          <Route path="/design" element={<Design />} />
          <Route path="/graphic-design" element={<GraphicDesign />} />
          <Route path="/video-editor" element={<VideoEditor />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default AppRoutes
