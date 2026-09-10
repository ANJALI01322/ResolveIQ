import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import OverviewView from './views/OverviewView';
import AnalyzeView from './views/AnalyzeView';
import ConversationsView from './views/ConversationsView';
import EvidenceView from './views/EvidenceView';
import EvaluationView from './views/EvaluationView';
import FailuresView from './views/FailuresView';
import { fetchSystemStatus, fetchEvaluationResults, fetchFailures } from './api';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [systemStatus, setSystemStatus] = useState(null);
  const [evaluationData, setEvaluationData] = useState(null);
  const [failuresData, setFailuresData] = useState(null);
  const [initialAnalyzeQuery, setInitialAnalyzeQuery] = useState('');

  useEffect(() => {
    // Initial data hydration
    fetchSystemStatus()
      .then(setSystemStatus)
      .catch(err => console.error("System status error:", err));

    fetchEvaluationResults()
      .then(setEvaluationData)
      .catch(err => console.error("Evaluation error:", err));

    fetchFailures()
      .then(setFailuresData)
      .catch(err => console.error("Failures error:", err));
  }, []);

  const handleNavigateToAnalyze = (queryText) => {
    setInitialAnalyzeQuery(queryText);
    setActiveTab('analyze');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-container">
      <Navbar
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        systemStatus={systemStatus}
      />

      <main className="main-content">
        {activeTab === 'overview' && (
          <OverviewView
            evaluationData={evaluationData}
            systemStatus={systemStatus}
            onNavigateToAnalyze={handleNavigateToAnalyze}
          />
        )}

        {activeTab === 'analyze' && (
          <AnalyzeView
            initialQuery={initialAnalyzeQuery}
            onEvidenceClick={() => setActiveTab('evidence')}
          />
        )}

        {activeTab === 'conversations' && (
          <ConversationsView
            onSelectConversationForAnalysis={handleNavigateToAnalyze}
          />
        )}

        {activeTab === 'evidence' && (
          <EvidenceView
            onSelectQueryForAnalysis={handleNavigateToAnalyze}
          />
        )}

        {activeTab === 'evaluation' && (
          <EvaluationView
            evaluationData={evaluationData}
          />
        )}

        {activeTab === 'failures' && (
          <FailuresView
            failuresData={failuresData}
          />
        )}
      </main>

      {/* Editorial Footer */}
      <footer style={{
        borderTop: '1px solid var(--border-subtle)',
        backgroundColor: 'var(--bg-surface)',
        padding: '2rem 1.5rem',
        marginTop: 'auto'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.84rem',
          color: 'var(--text-muted)'
        }}>
          <div>
            <strong style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-serif)', fontSize: '1.05rem' }}>
              ResolveIQ
            </strong>
            <span style={{ marginLeft: '0.5rem' }}>
              · Evidence-Grounded AI Support Intelligence Platform
            </span>
          </div>

          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span>Dataset: Twitter Customer Support (@AmazonHelp)</span>
            <span>Golden Set: N=200</span>
            <span>Hiver SDE Assignment</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
