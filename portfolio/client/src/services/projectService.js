const SEEDED_PROJECTS = [
  {
    _id: 'proj_1',
    title: 'Student Learning Management System',
    description: 'A comprehensive educational course management system featuring role-based secure access control designed for students, instructors, and system administrators.',
    technology: ['Spring Boot', 'MySQL', 'REST API', 'Spring Security', 'Java'],
    githubLink: 'https://github.com/akash-k/student-lms',
    liveLink: '',
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=800'
  },
  {
    _id: 'proj_2',
    title: 'DriveWise – Intelligent Driver Safety Monitoring System',
    description: 'An AI-powered active safety monitoring system that processes real-time camera feeds to detect distracted driving, cell phone usage, and drowsy behaviors using OpenCV and custom ML models.',
    technology: ['Python', 'OpenCV', 'Machine Learning', 'TensorFlow', 'Keras'],
    githubLink: 'https://github.com/akash-k/drivewise',
    liveLink: '',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=800'
  },
  {
    _id: 'proj_3',
    title: 'Smart Healthcare Portal',
    description: 'A responsive digital healthcare panel allowing secure patients registration, medical reports archiving, and doctor appointment scheduling wrapped with JSON Web Tokens authentication.',
    technology: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Tailwind CSS', 'Axios'],
    githubLink: 'https://github.com/akash-k/smart-healthcare',
    liveLink: '',
    image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800'
  },
  {
    _id: 'proj_4',
    title: 'Predict Equipment Failure Using Sensor Data',
    description: 'A predictive maintenance ML pipeline that reads temperature, vibration, and rotation timeseries sensor streams to forecast hardware malfunctions before failure occurs.',
    technology: ['Python', 'Pandas', 'Scikit-learn', 'Numpy', 'Matplotlib'],
    githubLink: 'https://github.com/akash-k/predictive-maintenance',
    liveLink: '',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800'
  }
];

const getStoredProjects = () => {
  const stored = localStorage.getItem('projects');
  if (!stored) {
    localStorage.setItem('projects', JSON.stringify(SEEDED_PROJECTS));
    return SEEDED_PROJECTS;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    localStorage.setItem('projects', JSON.stringify(SEEDED_PROJECTS));
    return SEEDED_PROJECTS;
  }
};

const saveProjects = (projects) => {
  localStorage.setItem('projects', JSON.stringify(projects));
};

export const getProjects = async () => {
  // Simulate API retrieval delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return getStoredProjects();
};

export const getProject = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  const projects = getStoredProjects();
  const project = projects.find(p => p._id === id);
  if (!project) throw new Error('Project not found');
  return project;
};

export const createProject = async (projectData) => {
  await new Promise(resolve => setTimeout(resolve, 600));
  const projects = getStoredProjects();
  const newProject = {
    ...projectData,
    _id: 'proj_' + Math.random().toString(36).substr(2, 9),
    createdAt: new Date().toISOString()
  };
  projects.unshift(newProject);
  saveProjects(projects);
  return newProject;
};

export const updateProject = async (id, projectData) => {
  await new Promise(resolve => setTimeout(resolve, 600));
  const projects = getStoredProjects();
  let updatedProject = null;
  const updatedProjects = projects.map(p => {
    if (p._id === id) {
      updatedProject = { ...p, ...projectData };
      return updatedProject;
    }
    return p;
  });
  if (!updatedProject) throw new Error('Project not found');
  saveProjects(updatedProjects);
  return updatedProject;
};

export const deleteProject = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const projects = getStoredProjects();
  const filtered = projects.filter(p => p._id !== id);
  saveProjects(filtered);
  return { message: 'Project removed successfully' };
};
