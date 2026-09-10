import React from 'react';
import { 
  Compass, 
  Sparkles, 
  MessageSquare, 
  FileSearch, 
  BarChart3, 
  AlertTriangle,
  ShieldCheck
} from 'lucide-react';

const TABS = [
  { id: 'overview', label: 'Overview', icon: Compass },
  { id: 'analyze', label: 'Analyze', icon: Sparkles },
  { id: 'conversations', label: 'Conversations', icon: MessageSquare },
  { id: 'evidence', label: 'Evidence', icon: FileSearch },
  { id: 'evaluation', label: 'Evaluation', icon: BarChart3 },
  { id: 'failures', label: 'Failures', icon: AlertTriangle }
];

export default function Navbar({ activeTab, onSelectTab, systemStatus }) {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="navbar-brand" style={{ cursor: 'pointer' }} onClick={() => onSelectTab('overview')}>
          <div className="brand-badge-icon">R</div>
          <div className="brand-text-wrapper">
            <span className="brand-name">ResolveIQ</span>
            <span className="brand-descriptor">Support Intelligence</span>
          </div>
        </div>

        <nav className="navbar-nav">
          {TABS.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                className={`nav-tab-btn ${isActive ? 'active' : ''}`}
                onClick={() => onSelectTab(tab.id)}
              >
                <Icon size={16} strokeWidth={isActive ? 2.3 : 1.8} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="nav-meta-status">
          <span className="status-indicator-dot"></span>
          <span>{systemStatus?.brand || '@AmazonHelp'} · {systemStatus?.status || 'Online'}</span>
        </div>
      </div>
    </header>
  );
}
