'use client'
import React, { createContext, useContext } from 'react';
import projectsArr from './ProjectStore'
import { Children } from '@/types/common';

const ProjectContext = createContext(projectsArr);

export const ProjectProvider = ({ children }: Children) => {
  return (
    <ProjectContext.Provider value={projectsArr}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => useContext(ProjectContext);
