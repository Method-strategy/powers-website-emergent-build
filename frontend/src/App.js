import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomeLayout from './components/HomeLayout';

import Home from './pages/Home';
import Approach from './pages/Approach';
import DiscoveryProcess from './pages/DiscoveryProcess';
import IndustriesServed from './pages/IndustriesServed';
import IndustryPage from './components/IndustryPage';
import CaseStudies from './pages/CaseStudies';
import OperationalDiscipline from './pages/OperationalDiscipline';
import FrontlineLeadership from './pages/FrontlineLeadership';
import EquipmentReliability from './pages/EquipmentReliability';
import WorkforceCapability from './pages/WorkforceCapability';
import DailyAccountability from './pages/DailyAccountability';
import History from './pages/History';
import Leadership from './pages/Leadership';
import CompanyNews from './pages/CompanyNews';
import Careers from './pages/Careers';
import Insights from './pages/Insights';
import Contact from './pages/Contact';
import BioRandallPowers from './pages/BioRandallPowers';
import BioSeanHart from './pages/BioSeanHart';
import BioSaulBautista from './pages/BioSaulBautista';
import BioKenWiesinger from './pages/BioKenWiesinger';
import BioJustinPethick from './pages/BioJustinPethick';
import BioKevinSabany from './pages/BioKevinSabany';
import CaseStudyDefenseAerospaceOTD from './pages/CaseStudyDefenseAerospaceOTD';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Homepage renders its own inline BriefHeader + BriefFooter
            — no shared chrome. The "Operating Brief" V5 design is
            client-approved and ships at `/` as the canonical
            homepage. Older iterations (V1-V4) have been archived
            to /app/_homepage_archive/ outside the build tree. */}
        <Route element={<HomeLayout />}>
          <Route path="/" element={<Home />} />

          {/* Pages migrated to the "Operating Brief" design language
              supply their own BriefHeader + BriefFooter, so they
              must NOT live inside <Layout> (which injects the legacy
              SiteHeader/SiteFooter). They sit here in the bare
              <HomeLayout> group alongside the homepages. Migrate
              additional pages into this group as their redesigns
              ship; once <Layout> has zero children left it can be
              removed altogether. */}
          <Route path="/history" element={<History />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/leadership" element={<Leadership />} />
          <Route path="/approach" element={<Approach />} />
          <Route path="/discovery-process" element={<DiscoveryProcess />} />
          <Route path="/operational-discipline" element={<OperationalDiscipline />} />
          <Route path="/frontline-leadership" element={<FrontlineLeadership />} />
          <Route path="/equipment-reliability" element={<EquipmentReliability />} />
          <Route path="/workforce-capability" element={<WorkforceCapability />} />
          <Route path="/daily-accountability" element={<DailyAccountability />} />
        </Route>

        {/* All other pages share the canonical Header/Footer from site-nav.jsx */}
        <Route element={<Layout />}>
          <Route path="/industries-served" element={<IndustriesServed />} />
          <Route path="/industries-served/:slug" element={<IndustryPage />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/case-studies/defense-aerospace-otd" element={<CaseStudyDefenseAerospaceOTD />} />
          <Route path="/leadership/randall-powers" element={<BioRandallPowers />} />
          <Route path="/leadership/sean-hart" element={<BioSeanHart />} />
          <Route path="/leadership/saul-bautista" element={<BioSaulBautista />} />
          <Route path="/leadership/ken-wiesinger" element={<BioKenWiesinger />} />
          <Route path="/leadership/justin-pethick" element={<BioJustinPethick />} />
          <Route path="/leadership/kevin-sabany" element={<BioKevinSabany />} />
          <Route path="/company-news" element={<CompanyNews />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
