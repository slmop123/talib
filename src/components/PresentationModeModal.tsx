import React from 'react';
import { PitchDeckViewer } from './PitchDeckViewer';

interface PresentationModeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPlaySound?: () => void;
}

export const PresentationModeModal: React.FC<PresentationModeModalProps> = ({
  isOpen,
  onClose,
  onPlaySound,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-5 bg-[#030914]/92 backdrop-blur-2xl">
      <div className="liquid-glass-dynamic rounded-3xl max-w-6xl w-full h-[94vh] border border-white/25 shadow-2xl overflow-hidden flex flex-col">
        <PitchDeckViewer
          isFullscreenModal={true}
          onCloseFullscreen={onClose}
          onPlaySound={onPlaySound}
        />
      </div>
    </div>
  );
};
