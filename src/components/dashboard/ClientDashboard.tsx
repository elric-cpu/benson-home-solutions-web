'use client';

import React from 'react';

interface ClientDashboardProps {
  embedUrl: string | null;
  title?: string;
}

/**
 * Renders a secure Metabase dashboard via iframe.
 */
export const ClientDashboard: React.FC<ClientDashboardProps> = ({ 
  embedUrl, 
  title = "Property Maintenance Report" 
}) => {
  if (!embedUrl) {
    return (
      <div className="p-8 border-2 border-dashed border-slate-200 rounded-xl text-center">
        <p className="text-slate-500">Dashboard connectivity is currently pending configuration.</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-[600px] flex flex-col">
      {title && <h2 className="text-xl font-bold text-oxblood mb-4">{title}</h2>}
      <div className="flex-1 rounded-xl overflow-hidden shadow-sm border border-slate-100 bg-white">
        <iframe
          src={embedUrl}
          frameBorder="0"
          width="100%"
          height="800px"
          allowTransparency
          title={title}
        />
      </div>
    </div>
  );
};
