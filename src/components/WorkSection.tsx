import React, { useState } from 'react';
import { ArrowUpRight, Award, ExternalLink } from 'lucide-react';
import { CASE_STUDIES, CaseStudy } from '../data/agencyData';

export const WorkSection: React.FC = () => {
  const [activeStudy, setActiveStudy] = useState<string>(CASE_STUDIES[0].id);

  return (
    <section id="work" className="py-24 bg-neutral-950 border-t border-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-2">
              <span>Featured Work & Results</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight text-balance">
              Proven Impact Across Indian Markets
            </h2>
          </div>
          <div className="text-neutral-400 text-sm max-w-sm">
            Every design decision, line of code, and ad spend is engineered to generate verifiable commercial returns.
          </div>
        </div>

        {/* Case Studies Display */}
        <div className="space-y-12">
          {CASE_STUDIES.map((study) => (
            <div
              key={study.id}
              className="bg-neutral-900/60 border border-neutral-800 rounded-2xl overflow-hidden hover:border-neutral-700 transition-all duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                {/* Visual Image Column */}
                <div className="lg:col-span-6 relative aspect-[16/10] lg:aspect-auto min-h-[300px] overflow-hidden bg-neutral-900">
                  <img
                    src={study.image}
                    alt={`${study.title} - ${study.client}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent lg:hidden" />
                </div>

                {/* Content & Metrics Column */}
                <div className="lg:col-span-6 p-8 sm:p-10 flex flex-col justify-between">
                  <div>
                    {/* Unboxed Metadata with Typographic Separator */}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-400 mb-3">
                      <span className="font-semibold text-indigo-400">{study.industry}</span>
                      <span aria-hidden="true" className="text-neutral-600">·</span>
                      <span className="text-neutral-300">{study.client}</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold text-white font-display tracking-tight leading-snug mb-4">
                      {study.title}
                    </h3>

                    <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                      {study.description}
                    </p>

                    {/* Services Delivered as Clean Text List */}
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-neutral-400 mb-8">
                      <span className="text-neutral-500">Delivered:</span>
                      {study.services.map((srv, idx) => (
                        <React.Fragment key={srv}>
                          <span className="text-neutral-300">{srv}</span>
                          {idx < study.services.length - 1 && (
                            <span aria-hidden="true" className="text-neutral-700">/</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  {/* Quantitative Rigor Proof Metric */}
                  <div className="pt-6 border-t border-neutral-800 flex items-end justify-between">
                    <div>
                      <div className="text-3xl sm:text-4xl font-extrabold text-white font-display tabular-nums tracking-tight">
                        {study.metric}
                      </div>
                      <div className="text-xs text-neutral-400 font-medium mt-1">
                        {study.metricLabel}
                      </div>
                    </div>

                    <a
                      href="#contact"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      <span>Replicate These Results</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Client Trust Banner */}
        <div className="mt-16 p-8 rounded-2xl bg-neutral-900/40 border border-neutral-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl font-bold text-white font-display tabular-nums">48 Hours</div>
            <div className="text-xs text-neutral-400 mt-1">Average Strategy Kickoff</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white font-display tabular-nums">100%</div>
            <div className="text-xs text-neutral-400 mt-1">Code & Asset Ownership</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white font-display tabular-nums">0 Lock-in</div>
            <div className="text-xs text-neutral-400 mt-1">Transparent Monthly Retainers</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white font-display tabular-nums">Direct Team</div>
            <div className="text-xs text-neutral-400 mt-1">Zero Middleman Account Reps</div>
          </div>
        </div>
      </div>
    </section>
  );
};
