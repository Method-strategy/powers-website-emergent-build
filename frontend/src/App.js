import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomeLayout from './components/HomeLayout';
import RouteTransitionRule from './components/RouteTransitionRule';
import SearchModal from './components/SearchModal';

// Home is eagerly imported — it's the canonical landing page and
// the most-likely first paint. Every other route is code-split via
// React.lazy() so the initial bundle stays lean. Each chunk is
// small (<50 KB compiled) so Suspense flashes are imperceptible
// on warm connections. The fallback matches the cream PAPER token
// so any loading state visually continues the page chrome (no
// white flash, no layout shift).
import Home from './pages/Home';
import LeaderBio from './components/LeaderBio';
import IndustryPage from './components/IndustryPage';
import NotFound from './pages/NotFound';

const Approach                    = lazy(() => import('./pages/Approach'));
const DiscoveryProcess            = lazy(() => import('./pages/DiscoveryProcess'));
const IndustriesServed            = lazy(() => import('./pages/IndustriesServed'));
const CaseStudies                 = lazy(() => import('./pages/CaseStudies'));
const OperationalDiscipline       = lazy(() => import('./pages/OperationalDiscipline'));
const FrontlineLeadership         = lazy(() => import('./pages/FrontlineLeadership'));
const EquipmentReliability        = lazy(() => import('./pages/EquipmentReliability'));
const WorkforceCapability         = lazy(() => import('./pages/WorkforceCapability'));
const DailyAccountability         = lazy(() => import('./pages/DailyAccountability'));
const History                     = lazy(() => import('./pages/History'));
const Leadership                  = lazy(() => import('./pages/Leadership'));
const CompanyNews                 = lazy(() => import('./pages/CompanyNews'));
const Careers                     = lazy(() => import('./pages/Careers'));
const Insights                    = lazy(() => import('./pages/Insights'));
const MasterySeries               = lazy(() => import('./pages/MasterySeries'));
const Downloadables               = lazy(() => import('./pages/Downloadables'));
const KPIs                        = lazy(() => import('./pages/KPIs'));
const FAQs                        = lazy(() => import('./pages/FAQs'));
const Glossary                    = lazy(() => import('./pages/Glossary'));
const Contact                     = lazy(() => import('./pages/Contact'));
const CaseStudyAerospaceDefenseOTD = lazy(() => import('./pages/CaseStudyAerospaceDefenseOTD'));

// Suspense fallback — a full-viewport cream pane that matches the
// site's PAPER background so any chunk-load state looks like the
// page is in the middle of its wipe-in (which is the visual rule
// for every interior page). No spinner, no skeleton — both would
// fight the editorial design system.
const RouteFallback = () => (
  <div
    aria-hidden="true"
    style={{
      minHeight: '100vh',
      background: '#fbfaf6',
      // Match the BriefHeader band so the chrome doesn't flash
      // a contrasting strip during the swap.
      paddingTop: 112,
    }}
  />
);

function App() {
  return (
    <BrowserRouter>
      <RouteTransitionRule />
      <SearchModal />
      <Suspense fallback={<RouteFallback />}>
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
            <Route path="/leadership/:slug" element={<LeaderBio />} />
            <Route path="/approach" element={<Approach />} />
            <Route path="/discovery-process" element={<DiscoveryProcess />} />
            <Route path="/operational-discipline" element={<OperationalDiscipline />} />
            <Route path="/frontline-leadership" element={<FrontlineLeadership />} />
            <Route path="/equipment-reliability" element={<EquipmentReliability />} />
            <Route path="/workforce-capability" element={<WorkforceCapability />} />
            <Route path="/daily-accountability" element={<DailyAccountability />} />
            <Route path="/company-news" element={<CompanyNews />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/manufacturing-mastery-series" element={<MasterySeries />} />
            <Route path="/downloadables" element={<Downloadables />} />
            <Route path="/manufacturing-metrics" element={<KPIs />} />
            <Route path="/frequently-asked-questions-faqs" element={<FAQs />} />
            <Route path="/glossary" element={<Glossary />} />
            <Route path="/contact" element={<Contact />} />
          </Route>

          {/* All other pages share the canonical Header/Footer from site-nav.jsx */}
          <Route element={<Layout />}>
            <Route path="/industries-served" element={<IndustriesServed />} />
            <Route path="/industries-served/:slug" element={<IndustryPage />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/case-studies/aerospace-defense-on-time-delivery" element={<CaseStudyAerospaceDefenseOTD />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
