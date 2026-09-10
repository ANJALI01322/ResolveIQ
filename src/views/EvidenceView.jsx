import React, { useState } from 'react';
import { 
  FileSearch, 
  Layers, 
  Sliders, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { analyzeMessage } from '../api';

export default function EvidenceView({ onSelectQueryForAnalysis }) {
  const [testQuery, setTestQuery] = useState("I returned the package 5 days ago and haven't received my refund.");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const handleTestRetrieval = async () => {
    if (!testQuery.trim()) return;
    setLoading(true);
    try {
      const data = await analyzeMessage(testQuery.trim());
      setResults(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ marginBottom: '0.5rem' }}>
          Evidence Retrieval & Inspectability
        </h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)' }}>
          Inspect how ResolveIQ’s hybrid retrieval engine combines semantic cosine similarity, lexical term overlap, and intent alignment to ground responses.
        </p>
      </div>

      {/* Architecture Explainer Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.25rem',
        marginBottom: '2rem'
      }}>
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.75rem' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--bg-soft-accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--primary)',
              fontWeight: 700
            }}>1</div>
            <strong style={{ fontSize: '1.05rem', color: 'var(--text-primary)' }}>
              TF-IDF Semantic Cosine (55%)
            </strong>
          </div>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
            Maps customer phrasing into sublinear TF-IDF vector space over n-grams (1,2) to capture conversational intent and contextual similarity.
          </p>
        </div>

        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.75rem' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--bg-soft-accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--secondary)',
              fontWeight: 700
            }}>2</div>
            <strong style={{ fontSize: '1.05rem', color: 'var(--text-primary)' }}>
              BM25 / Lexical Overlap (30%)
            </strong>
          </div>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
            Enforces strict matching on concrete domain entities like order IDs, carrier names (UPS, USPS, AMZL), Kindle apps, and Prime terms.
          </p>
        </div>

        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.75rem' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--bg-soft-accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--primary-dark)',
              fontWeight: 700
            }}>3</div>
            <strong style={{ fontSize: '1.05rem', color: 'var(--text-primary)' }}>
              Intent Compatibility (15%)
            </strong>
          </div>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
            Applies calibrated categorical compatibility boost when the candidate case belongs to the predicted intent taxonomy bucket.
          </p>
        </div>
      </div>

      {/* Interactive Retrieval Workbench */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div className="card-header">
          <h3 className="card-title">
            <Sliders size={20} color="var(--primary)" />
            Retrieval Inspector Workbench
          </h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Live Hybrid Scoring Analysis
          </span>
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem' }}>
          <input
            type="text"
            className="form-input"
            value={testQuery}
            onChange={(e) => setTestQuery(e.target.value)}
            placeholder="Enter test customer inquiry..."
          />
          <button
            className="btn btn-primary"
            onClick={handleTestRetrieval}
            disabled={loading || !testQuery.trim()}
            style={{ whiteSpace: 'nowrap' }}
          >
            <FileSearch size={16} />
            Inspect Retrieval
          </button>
        </div>

        {/* Retrieval Output Breakdown */}
        {results?.evidence && (
          <div>
            <div style={{
              padding: '0.75rem 1rem',
              backgroundColor: 'var(--bg-subtle)',
              borderRadius: 'var(--radius-sm)',
              marginBottom: '1rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '0.84rem'
            }}>
              <span>
                <strong>Classified Category:</strong> {results.intent.display_name} ({(results.intent.confidence * 100).toFixed(1)}% certainty)
              </span>
              <span>
                <strong>Extracted Pattern:</strong> {results.resolution_pattern}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {results.evidence.map((item, idx) => (
                <div key={item.id} style={{
                  backgroundColor: 'var(--bg-surface-elevated)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '1.25rem'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        color: 'var(--primary)'
                      }}>
                        #{idx + 1} {item.id}
                      </span>
                      <span className="badge badge-intent" style={{ fontSize: '0.72rem' }}>
                        {item.intent_display}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span style={{
                        fontSize: '0.84rem',
                        fontWeight: 700,
                        color: 'var(--primary-dark)',
                        backgroundColor: 'var(--bg-soft-accent)',
                        padding: '0.2rem 0.6rem',
                        borderRadius: 'var(--radius-pill)'
                      }}>
                        Combined: {(item.similarity_score * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>

                  {/* Score Component Meters */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                    gap: '0.75rem',
                    margin: '0.75rem 0',
                    backgroundColor: 'var(--bg-parchment)',
                    padding: '0.65rem 0.85rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.76rem'
                  }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                        <span>Semantic Cosine</span>
                        <strong>{(item.semantic_score * 100).toFixed(1)}%</strong>
                      </div>
                      <div className="confidence-meter-bar" style={{ height: '4px', margin: 0 }}>
                        <div className="confidence-meter-fill" style={{ width: `${item.semantic_score * 100}%` }} />
                      </div>
                    </div>

                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                        <span>Lexical Overlap</span>
                        <strong>{(item.lexical_score * 100).toFixed(1)}%</strong>
                      </div>
                      <div className="confidence-meter-bar" style={{ height: '4px', margin: 0 }}>
                        <div className="confidence-meter-fill" style={{ width: `${item.lexical_score * 100}%`, backgroundColor: 'var(--secondary)' }} />
                      </div>
                    </div>

                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                        <span>Intent Compatibility</span>
                        <strong style={{ color: item.intent_match ? 'var(--status-pass-text)' : 'var(--text-muted)' }}>
                          {item.intent_match ? '+15% Boost' : 'Neutral'}
                        </strong>
                      </div>
                      <div className="confidence-meter-bar" style={{ height: '4px', margin: 0 }}>
                        <div className="confidence-meter-fill" style={{ width: item.intent_match ? '100%' : '0%', backgroundColor: 'var(--primary-dark)' }} />
                      </div>
                    </div>
                  </div>

                  {/* Dialogue snippet */}
                  <div style={{ fontSize: '0.86rem', color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                    <strong>Historical Inquiry:</strong> "{item.customer_message}"
                  </div>
                  <div style={{ fontSize: '0.86rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                    <strong>Resolution Guidance:</strong> "{item.historical_resolution}"
                  </div>
                  <div style={{ fontSize: '0.76rem', color: 'var(--text-light)', marginTop: '0.5rem' }}>
                    <strong>Ranking Rationale:</strong> {item.relevance_reason}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
