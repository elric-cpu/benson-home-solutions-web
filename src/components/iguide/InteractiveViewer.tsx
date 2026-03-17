'use client';

import { useState, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Eye, Map, Camera, ShieldCheck } from 'lucide-react';

interface InteractiveViewerProps {
  viewId: string;
  initialPanoId?: string;
  propertyName?: string;
}

/**
 * InteractiveViewer — React wrapper for the iGUIDE Viewer JS API.
 * Implements Lazy-Loading and "Teleport" forensic verification.
 */
export function InteractiveViewer({
  viewId,
  initialPanoId,
  propertyName = 'Active Forensic Property',
}: InteractiveViewerProps) {
  const [isActive, setIsActive] = useState(false);
  const [currentRoom, setCurrentRoom] = useState('Loading...');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Lazy-loading: only load the heavy 3D engine on user intent
  const handleActivate = () => setIsActive(true);

  // Mock Teleport: Demonstrates Dashboard -> Tour communication
  const teleportToRoom = (panoId: string, roomName: string) => {
    if (!iframeRef.current) return;
    setCurrentRoom(roomName);

    if (iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        { type: 'move', panoId },
        '*',
      );
    }
  };

  const iGuideUrl = `https://youriguide.com/${viewId}?embed=true${initialPanoId ? `&pano=${initialPanoId}` : ''}`;

  return (
    <Card className="border-slate/10 bg-slate/5 overflow-hidden">
      <div className="bg-slate/20 relative aspect-video w-full">
        {!isActive ? (
          <div className="flex h-full flex-col items-center justify-center space-y-4 p-8 text-center">
            <div className="bg-maroon/10 text-maroon rounded-full p-4">
              <Map className="h-12 w-12" />
            </div>
            <div>
              <h3 className="text-xl font-bold">
                Interactive 3D Spatial Audit
              </h3>
              <p className="text-slate/60 mx-auto max-w-md text-sm">
                Explore the digital twin of {propertyName}. This interactive
                view provides mm-accurate forensic proof of all completed
                maintenance.
              </p>
            </div>
            <Button
              onClick={handleActivate}
              className="bg-maroon hover:bg-maroon/90 text-cream"
            >
              Activate 3D Viewer (2.2MB)
            </Button>
          </div>
        ) : (
          <iframe
            ref={iframeRef}
            src={iGuideUrl}
            className="h-full w-full"
            frameBorder="0"
            allowFullScreen
            loading="lazy"
          />
        )}

        {/* Forensic HUD Overlay */}
        {isActive && (
          <div className="absolute top-4 left-4 z-10 flex flex-col space-y-2">
            <Badge className="bg-maroon/90 text-cream shadow-elevated border-none px-3 py-1.5">
              <ShieldCheck className="mr-1.5 h-3.5 w-3.5" />
              Benson Forensic Verified
            </Badge>
            <div className="border-slate/10 min-w-[180px] rounded-lg border bg-white/90 p-3 shadow-sm backdrop-blur-sm">
              <div className="text-slate/50 mb-1 text-[10px] font-bold tracking-wider uppercase">
                Current Location
              </div>
              <div className="flex items-center text-sm font-bold">
                <Camera className="text-maroon mr-2 h-4 w-4" />
                {currentRoom || 'Synchronizing...'}
              </div>
            </div>
          </div>
        )}
      </div>

      <CardContent className="border-slate/10 border-t bg-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => teleportToRoom('pano_kitch', 'Kitchen')}
              disabled={!isActive}
            >
              <Eye className="mr-2 h-4 w-4" /> Inspect Kitchen
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => teleportToRoom('pano_mech', 'Mechanical Room')}
              disabled={!isActive}
            >
              <Map className="mr-2 h-4 w-4" /> Inspect Mechanical
            </Button>
          </div>

          <div className="text-slate/50 flex items-center space-x-2 text-xs">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            <span>Lender Access Logged</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
