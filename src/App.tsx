import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { OverviewPage } from './pages/OverviewPage';
import { LearnPromptingPage } from './pages/LearnPromptingPage';
import { PlaygroundPage } from './pages/PlaygroundPage';
import { ExamplesPage } from './pages/ExamplesPage';
import { QuizPage } from './pages/QuizPage';
import { PromptLibraryPage } from './pages/PromptLibraryPage';
import { WorkshopPlannerPage } from './pages/WorkshopPlannerPage';
import { AiVerificationPage } from './pages/AiVerificationPage';
import { ProjectResourcesPage } from './pages/ProjectResourcesPage';
import { SettingsPage } from './pages/SettingsPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<OverviewPage />} />
          <Route path="learn" element={<LearnPromptingPage />} />
          <Route path="playground" element={<PlaygroundPage />} />
          <Route path="examples" element={<ExamplesPage />} />
          <Route path="quiz" element={<QuizPage />} />
          <Route path="library" element={<PromptLibraryPage />} />
          <Route path="workshop" element={<WorkshopPlannerPage />} />
          <Route path="verification" element={<AiVerificationPage />} />
          <Route path="resources" element={<ProjectResourcesPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
