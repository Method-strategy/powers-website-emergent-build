import React, { useEffect, useMemo, useState, useRef } from 'react';
import { caseStudies } from '../data/caseStudies';
import { caseStudiesLibraryStyles } from '../components/caseStudy/caseStudiesLibraryStyles';
import CaseStudyCard from '../components/caseStudy/CaseStudyCard';
import BriefDocStyles, { useInViewClass, PAPER } from '../components/BriefDocStyles';

/**
 * CaseStudies — the case-study library page at /case-studies.
 *
 * Refactored from the legacy inline-script + dangerouslySetInnerHTML
 * implementation into a proper React component. All state lives in React
 * hooks, the card grid renders via <CaseStudyCard /> mapped over the
 * canonical dataset in /app/frontend/src/data/caseStudies.js, and every
 * filter/sort/search operation is pure JS against that array.
 *
 * Visual treatment is preserved by reusing the original library CSS via
 * <style dangerouslySetInnerHTML={{__html: caseStudiesLibraryStyles}}>.
 * Class names match the legacy selectors so no rules need rewrites.
 */

const DEBOUNCE_MS = 80;

function unique(arr) {
  return [...new Set(arr.filter(Boolean))].sort();
}

function useDebounced(value, delay) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setV(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return v;
}

export default function CaseStudies() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounced(search, DEBOUNCE_MS);
  const [industry, setIndustry] = useState('');
  const [engagement, setEngagement] = useState('');
  const [challenge, setChallenge] = useState('');
  const [sort, setSort] = useState('newest');

  useEffect(() => {
    document.title = 'Case Studies | POWERS Manufacturing Consulting';
  }, []);

  // Filter facet values, derived from the canonical dataset.
  const industries  = useMemo(() => unique(caseStudies.map((d) => d.industry)), []);
  const engagements = useMemo(() => unique(caseStudies.flatMap((d) => d.serviceLines || [])), []);
  const challenges  = useMemo(() => unique(caseStudies.flatMap((d) => d.challenges || [])), []);

  // Filtered + sorted cards.
  const filtered = useMemo(() => {
    const q = debouncedSearch.trim().toLowerCase();
    let out = caseStudies.filter((d) => {
      if (industry && d.industry !== industry) return false;
      if (engagement && !(d.serviceLines || []).includes(engagement)) return false;
      if (challenge && !(d.challenges || []).includes(challenge)) return false;
      if (q) {
        const hay = [
          d.headlineResult, d.resultSummary, d.industry,
          ...(d.serviceLines || []), ...(d.challenges || []),
        ].join(' ').toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    const byDate  = (a, b) => new Date(b.date) - new Date(a.date);
    const byDateA = (a, b) => new Date(a.date) - new Date(b.date);
    const byNumA  = (a, b) => a.num - b.num;
    const byNumD  = (a, b) => b.num - a.num;
    const sorter  = { newest: byDate, oldest: byDateA, 'num-asc': byNumA, 'num-desc': byNumD }[sort] || byDate;
    return [...out].sort(sorter);
  }, [debouncedSearch, industry, engagement, challenge, sort]);

  const activeFilters = [
    industry   && { key: 'industry',   label: industry,   setter: setIndustry },
    engagement && { key: 'engagement', label: engagement, setter: setEngagement },
    challenge  && { key: 'challenge',  label: challenge,  setter: setChallenge },
    debouncedSearch.trim() && { key: 'search', label: `"${debouncedSearch.trim()}"`, setter: () => setSearch('') },
  ].filter(Boolean);

  const clearAll = () => {
    setSearch('');
    setIndustry('');
    setEngagement('');
    setChallenge('');
    setSort('newest');
  };

  // Hero in-view ref for the wipe-build choreography on entry.
  const heroRef = useRef(null);
  useInViewClass(heroRef);

  return (
    <>
      {/* Library legacy styles (filter UI + card grid). The hero
          block from this stylesheet (.library-hero) is overridden
          and replaced with the brief's standard hero (cream PAPER
          surface, 96px sans+gold-accent H1, 17px lede) so the
          page reads as one document with the rest of the site. */}
      <style dangerouslySetInnerHTML={{ __html: caseStudiesLibraryStyles }} />
      <BriefDocStyles />

      <section ref={heroRef} className="brief-page-hero">
        <div className="brief-doc-inner">
          <div className="brief-doc-col">
            <div className="station-index wipe" style={{ marginBottom: 24 }}>Case Studies</div>
            <h1 className="brief-doc-h1 wipe wipe-d1">
              <span>Proven execution.</span>
              <span className="accent">Built to perform.</span>
            </h1>
            <p className="brief-doc-lede wipe wipe-d2" style={{ marginTop: 28, maxWidth: 760 }}>
              Real operations. Real pressure. Measurable results. Every case below is an operation that had to execute and perform under conditions like yours. The proof is in the resilient execution capability we built working side by side with our clients and the lasting results it produced. Search by industry, service type, or operational challenge.
            </p>
            <div className="brief-doc-rule wipe wipe-d3" style={{ marginTop: 56 }} />
          </div>
        </div>
      </section>

      <div className="controls-bar">
        <div className="controls-bar-inner">
          <div className="search-row">
            <div className="search-wrap">
              <span className="search-icon" role="img" aria-label="search">🔍</span>
              <input
                type="text"
                id="searchInput"
                data-testid="lib-search-input"
                placeholder="Search by keyword, industry, result..."
                autoComplete="off"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button type="button" className="clear-btn" data-testid="lib-clear-all" onClick={clearAll}>
              Clear All
            </button>
          </div>

          <div className="filters-row">
            <div className="filter-group">
              <div className="filter-label">Industry</div>
              <select className="filter-select" id="industryFilter" data-testid="lib-filter-industry"
                value={industry} onChange={(e) => setIndustry(e.target.value)}>
                <option value="">All Industries</option>
                {industries.map((v) => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>
            <div className="filter-group">
              <div className="filter-label">Service Type</div>
              <select className="filter-select" id="engagementFilter" data-testid="lib-filter-service"
                value={engagement} onChange={(e) => setEngagement(e.target.value)}>
                <option value="">All Service Types</option>
                {engagements.map((v) => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>
            <div className="filter-group">
              <div className="filter-label">Primary Challenge</div>
              <select className="filter-select" id="challengeFilter" data-testid="lib-filter-challenge"
                value={challenge} onChange={(e) => setChallenge(e.target.value)}>
                <option value="">All Challenges</option>
                {challenges.map((v) => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>
            <div className="filter-group sort-group">
              <div className="filter-label">Sort By</div>
              <select className="filter-select" id="sortFilter" data-testid="lib-sort"
                value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="num-asc">Case # (Ascending)</option>
                <option value="num-desc">Case # (Descending)</option>
              </select>
            </div>
          </div>

          {activeFilters.length > 0 ? (
            <div className="active-filters" id="activePills">
              {activeFilters.map((f) => (
                <span className="filter-pill" key={f.key}>
                  {f.label}
                  <button type="button" className="pill-remove" aria-label={`Remove ${f.label}`}
                    onClick={() => f.setter('')}>✕</button>
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <main className="main-content">
        <div className="cards-grid" id="cardsGrid" data-testid="cards-grid">
          {filtered.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', padding: '60px 0', textAlign: 'center', color: 'var(--text-muted)' }}>
              No case studies match these filters. <button type="button" className="pill-remove" onClick={clearAll} style={{ marginLeft: 8, color: 'var(--gold-muted)' }}>Clear all</button>
            </div>
          ) : (
            filtered.map((d, i) => (
              <CaseStudyCard
                key={d.num}
                data={d}
                query={debouncedSearch.trim()}
                animDelay={Math.min(i * 0.04, 0.4)}
              />
            ))
          )}
        </div>
      </main>
    </>
  );
}
