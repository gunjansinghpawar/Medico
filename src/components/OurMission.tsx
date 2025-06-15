"use client";

import React from "react";
import { Users, Heart, Shield } from "lucide-react";

const OurMission = () => {
  return (
    <section
      id="team"
      className="px-4 sm:px-6 lg:px-8 py-20 bg-muted/20 dark:bg-muted/10 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 text-foreground">
            Our Mission
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Making healthcare accessible through AI-powered assistance in your preferred language
          </p>
        </div>

        {/* Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-[rgb(var(--muted))] backdrop-blur-md p-8 rounded-2xl shadow-md border border-[rgb(var(--border))] text-center hover:shadow-xl transition-all duration-300">
            <Users className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-3">
              Community Driven
            </h3>
            <p className="text-muted-foreground">
              Built by healthcare enthusiasts committed to making medical assistance accessible to everyone.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-[rgb(var(--muted))] backdrop-blur-md p-8 rounded-2xl shadow-md border border-[rgb(var(--border))] text-center hover:shadow-xl transition-all duration-300">
            <Heart className="w-12 h-12 text-red-500 dark:text-red-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-3">
              Healthcare for All
            </h3>
            <p className="text-muted-foreground">
              Breaking language barriers to provide healthcare guidance in the language you&#39;re comfortable with.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-[rgb(var(--muted))] backdrop-blur-md p-8 rounded-2xl shadow-md border border-[rgb(var(--border))] text-center hover:shadow-xl transition-all duration-300">
            <Shield className="w-12 h-12 text-green-600 dark:text-green-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-3">
              Safe & Reliable
            </h3>
            <p className="text-muted-foreground">
              Committed to providing accurate information while always encouraging professional medical consultation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurMission;
