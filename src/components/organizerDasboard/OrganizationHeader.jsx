import React from 'react';

const OrganizationHeader = ({ title, description }) => {
  return (
    <div className="mb-8 pb-5 border-b border-white/5 relative overflow-hidden">
      
      <div className="absolute top-0 left-0 w-32 h-32 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
      
     
      <h2 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 tracking-tight leading-tight">
        {title}
      </h2>
      
      
      <p className="text-xs md:text-sm text-slate-400 mt-2 max-w-2xl leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default OrganizationHeader;