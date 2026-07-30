import React from 'react';

interface ProfessionalWorkspaceSceneProps {
  imageSrc: string;
  onExploreDemo?: () => void;
}

export const ProfessionalWorkspaceScene: React.FC<ProfessionalWorkspaceSceneProps> = ({ 
  imageSrc
}) => {
  return (
    <div className="relative w-full flex items-center justify-center select-none bg-transparent">
      <div className="relative w-full flex items-center justify-center bg-transparent">
        <img
          src={imageSrc}
          alt="Placivo AI Student Scene"
          className="w-full h-auto max-h-[560px] object-contain mix-blend-multiply contrast-[1.12] brightness-[1.03] saturate-[1.05] transition-transform duration-700 hover:scale-[1.01] [mask-image:radial-gradient(ellipse_at_center,black_80%,transparent_100%)]"
        />
      </div>
    </div>
  );
};


