import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomeLayout from './components/HomeLayout';

import Home from './pages/Home';
import HomeV2 from './pages/HomeV2';
import Approach from './pages/Approach';
import DiscoveryProcess from './pages/DiscoveryProcess';
import IndustriesServed from './pages/IndustriesServed';
import CaseStudies from './pages/CaseStudies';
import OperationalReadiness from './pages/OperationalReadiness';
import FrontlineLeadership from './pages/FrontlineLeadership';
import EquipmentReliability from './pages/EquipmentReliability';
import SupplyChain from './pages/SupplyChain';
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
        {/* Homepage renders its own inline Header + Footer — no shared chrome */}
        <Route element={<HomeLayout />}>
          <Route path="/" element={<Home />} />
          {/* /v2 — copy iteration: roots / chase / produce voice.
              Reversible: delete this line + HomeV2.jsx to revert. */}
          <Route path="/v2" element={<HomeV2 />} />
        </Route>

        {/* All other pages share the canonical Header/Footer from site-nav.jsx */}
        <Route element={<Layout />}>
          <Route path="/approach" element={<Approach />} />
          <Route path="/discovery-process" element={<DiscoveryProcess />} />
          <Route path="/industries-served" element={<IndustriesServed />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/case-studies/defense-aerospace-otd" element={<CaseStudyDefenseAerospaceOTD />} />
          <Route path="/operational-readiness" element={<OperationalReadiness />} />
          <Route path="/frontline-leadership" element={<FrontlineLeadership />} />
          <Route path="/equipment-reliability" element={<EquipmentReliability />} />
          <Route path="/supply-chain" element={<SupplyChain />} />
          <Route path="/history" element={<History />} />
          <Route path="/leadership" element={<Leadership />} />
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
