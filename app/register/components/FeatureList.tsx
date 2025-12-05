"use client";

import React from "react";

interface FeatureListProps {
  className?: string;
}

const FeatureList = ({ className }: FeatureListProps) => {
  const features = [
    {
      icon: "🤖",
      title: "AI-Powered Development",
      description: "Built-in Copilot and code assistance to accelerate your development workflow"
    },
    {
      icon: "📁",
      title: "Unlimited Repositories",
      description: "Collaborate securely on public and private projects without limits"
    },
    {
      icon: "🔍",
      title: "Integrated Code Reviews",
      description: "Boost code quality with built-in review tools and AI-powered suggestions"
    },
    {
      icon: "⚡",
      title: "Automated Workflows",
      description: "Save time with CI/CD integrations and Giteria Actions"
    },
    {
      icon: "🌍",
      title: "Community Support",
      description: "Connect with developers worldwide for instant feedback and insights"
    },
    {
      icon: "🔒",
      title: "Enterprise Security",
      description: "Grade security and compliance features for peace of mind"
    }
  ];

  return (
    <div className={`space-y-6 ${className || ''}`}>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Create your free account
      </h2>
      <p className="text-gray-600 mb-8">
        Explore Giteria's core features for individuals and organizations. See what's included
      </p>
      
      <div className="space-y-4">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start space-x-3">
            <span className="text-2xl flex-shrink-0">{feature.icon}</span>
            <div>
              <h3 className="font-semibold text-gray-900">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { FeatureList };