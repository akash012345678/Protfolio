const SEEDED_PROJECTS = [
  {
    _id: 'proj_purpleinsight',
    title: 'PurpleInsight – AI-Powered Retail Store Intelligence System',
    description: 'A hybrid edge-cloud retail analytics platform that converts CCTV and POS data into real-time business insights. Features AI-based customer tracking, heatmap generation, dwell-time analysis, occupancy monitoring, and conversion analytics. Implements scalable FastAPI microservices with spatial-temporal shopper-to-purchase correlation, deployed using Docker, PostgreSQL, TimescaleDB, Redis, and Nginx.',
    technology: ['Python', 'FastAPI', 'YOLOv8', 'ByteTrack', 'PostgreSQL', 'Redis', 'Docker', 'TimescaleDB', 'Nginx'],
    githubLink: 'https://github.com/akash012345678/Interactive-AI-Assistant-for-Education.git',
    liveLink: 'https://retailpulse-frontend.onrender.com',
    image: '/purpleinsight.png'
  },
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
    githubLink: 'https://github.com/akash012345678/Drivewise_Project.git',
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
  }
];

const CURRENT_VERSION = '1.2';

const getStoredProjects = () => {
  const version = localStorage.getItem('portfolio_version');
  if (version !== CURRENT_VERSION) {
    localStorage.removeItem('projects');
    localStorage.setItem('portfolio_version', CURRENT_VERSION);
  }

  const stored = localStorage.getItem('projects');
  if (!stored) {
    localStorage.setItem('projects', JSON.stringify(SEEDED_PROJECTS));
    return SEEDED_PROJECTS;
  }
  try {
    let parsed = JSON.parse(stored);
    const decommissionedIds = ['proj_4'];

    // Filter out decommissioned projects
    parsed = parsed.filter(p => !decommissionedIds.includes(p._id));

    // Force sync default projects with current codebase SEEDED_PROJECTS values
    SEEDED_PROJECTS.forEach(seeded => {
      const matchIdx = parsed.findIndex(p => p._id === seeded._id);
      if (matchIdx !== -1) {
        parsed[matchIdx] = { ...parsed[matchIdx], ...seeded };
      } else {
        parsed.unshift(seeded);
      }
    });

    localStorage.setItem('projects', JSON.stringify(parsed));
    return parsed;
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
