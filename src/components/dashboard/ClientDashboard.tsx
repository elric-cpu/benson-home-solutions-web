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
  title = 'Property Maintenance Report',
}) => {
  if (!embedUrl) {
    return (
      <div className="rounded-xl border-2 border-dashed border-slate-200 p-8 text-center">
        <p className="text-slate-500">
          Dashboard connectivity is currently pending configuration.
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-[600px] w-full flex-col">
      {title && (
        <h2 className="text-oxblood mb-4 text-xl font-bold">{title}</h2>
      )}
      <div className="flex-1 overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm">
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
