"use client";

import React from "react";
import { Shield } from "lucide-react";

const Disclaimer = () => {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-7xl mx-auto bg-amber-50 dark:bg-amber-900/10 border-2 border-amber-200 dark:border-amber-700 rounded-2xl p-8 text-center transition-colors duration-300">
        <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-800 mx-auto mb-4 flex items-center justify-center">
          <Shield className="w-8 h-8 text-amber-600 dark:text-amber-400" />
        </div>
        <h3 className="text-xl font-bold text-foreground mb-4">
          Important Medical Disclaimer
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          This AI health assistant provides general health information and should not replace professional medical advice,
          diagnosis, or treatment. Always consult with qualified healthcare professionals for serious health concerns or
          before making medical decisions. In case of medical emergencies, contact emergency services immediately.
        </p>
      </div>
    </section>
  );
};

export default Disclaimer;
