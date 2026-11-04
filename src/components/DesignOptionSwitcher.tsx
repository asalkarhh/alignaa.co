import React, { useState } from 'react';
import { Layout, Check, ChevronUp, ChevronDown } from 'lucide-react';
import { DesignLayoutOption } from '../types';

interface DesignOptionSwitcherProps {
  currentOption: DesignLayoutOption;
  onSelectOption: (option: DesignLayoutOption) => void;
}

export const DesignOptionSwitcher: React.FC<DesignOptionSwitcherProps> = ({
  currentOption,
  onSelectOption
}) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className="design-preview-bar"
      aria-label="Design Review Layout Switcher"
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        <Layout size={16} color="#007B7F" />
        <span style={{ fontWeight: 600 }}>Design Review Prototype:</span>
        {!collapsed && (
          <span style={{ color: '#9CA3AF' }}>
            Switch between 3 approved design arrangements
          </span>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        {!collapsed && (
          <div className="preview-options" role="group" aria-label="Layout Options">
            <button
              type="button"
              className={`preview-btn ${currentOption === 'a' ? 'active' : ''}`}
              onClick={() => onSelectOption('a')}
              title="Wide hero video, spacious offer, clean grids"
            >
              {currentOption === 'a' && <Check size={12} style={{ display: 'inline', marginRight: '3px' }} />}
              Option A: Video First (Default)
            </button>

            <button
              type="button"
              className={`preview-btn ${currentOption === 'b' ? 'active' : ''}`}
              onClick={() => onSelectOption('b')}
              title="Split clinical layout, focus on doctor process and outcomes"
            >
              {currentOption === 'b' && <Check size={12} style={{ display: 'inline', marginRight: '3px' }} />}
              Option B: Clinical & Structured
            </button>

            <button
              type="button"
              className={`preview-btn ${currentOption === 'c' ? 'active' : ''}`}
              onClick={() => onSelectOption('c')}
              title="Smiles, before/after cases and testimonials upfront"
            >
              {currentOption === 'c' && <Check size={12} style={{ display: 'inline', marginRight: '3px' }} />}
              Option C: Patient Story Led
            </button>
          </div>
        )}

        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          style={{
            background: 'none',
            border: 'none',
            color: '#9CA3AF',
            cursor: 'pointer',
            padding: '2px',
            display: 'flex',
            alignItems: 'center',
            fontSize: '0.75rem'
          }}
          aria-label={collapsed ? 'Expand design switcher' : 'Collapse design switcher'}
        >
          {collapsed ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
        </button>
      </div>
    </aside>
  );
};

