import React, { useState } from 'react';
import { ScreenId } from './types';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { GuidedDemoModal } from './components/GuidedDemoModal';

import { Screen01ProblemApproach } from './screens/Screen01ProblemApproach';
import { Screen02GraphBuilder } from './screens/Screen02GraphBuilder';
import { Screen03KruskalStepper } from './screens/Screen03KruskalStepper';
import { Screen04DataStructures } from './screens/Screen04DataStructures';
import { Screen05AlgorithmCompare } from './screens/Screen05AlgorithmCompare';
import { Screen06FailureSimulator } from './screens/Screen06FailureSimulator';
import { Screen07TestingEfficiency } from './screens/Screen07TestingEfficiency';
import { Screen08DynamicMultiCrit } from './screens/Screen08DynamicMultiCrit';
import { Screen09MarksDashboard } from './screens/Screen09MarksDashboard';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('problem-approach');
  const [isDemoOpen, setIsDemoOpen] = useState<boolean>(false);

  const handleNavigate = (screen: ScreenId) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderActiveScreen = () => {
    switch (currentScreen) {
      case 'problem-approach':
        return <Screen01ProblemApproach onNavigate={handleNavigate} />;
      case 'graph-builder':
        return <Screen02GraphBuilder onNavigate={handleNavigate} />;
      case 'kruskal-stepper':
        return <Screen03KruskalStepper onNavigate={handleNavigate} />;
      case 'data-structures':
        return <Screen04DataStructures onNavigate={handleNavigate} />;
      case 'algorithm-compare':
        return <Screen05AlgorithmCompare onNavigate={handleNavigate} />;
      case 'failure-simulator':
        return <Screen06FailureSimulator onNavigate={handleNavigate} />;
      case 'testing-efficiency':
        return <Screen07TestingEfficiency onNavigate={handleNavigate} />;
      case 'dynamic-multi-criteria':
        return <Screen08DynamicMultiCrit onNavigate={handleNavigate} />;
      case 'marks-dashboard':
        return <Screen09MarksDashboard onNavigate={handleNavigate} />;
      default:
        return <Screen01ProblemApproach onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="bg-surface text-on-surface min-h-screen flex antialiased">
      {/* 260px Fixed Sidebar */}
      <Sidebar currentScreen={currentScreen} onNavigate={handleNavigate} />

      {/* Main Content Area */}
      <div className="pl-[260px] flex-1 flex flex-col min-w-0">
        <Header onNavigate={handleNavigate} onOpenDemo={() => setIsDemoOpen(true)} />

        <main className="w-full pt-16 bg-surface min-h-screen">
          {renderActiveScreen()}
        </main>
      </div>

      {/* Guided Walkthrough Modal */}
      <GuidedDemoModal
        isOpen={isDemoOpen}
        onClose={() => setIsDemoOpen(false)}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
