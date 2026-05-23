import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { logout, getCurrentUser } from '../services/authService';
import { getProjects, createProject, updateProject, deleteProject } from '../services/projectService';
import { getMessages, deleteMessage } from '../services/messageService';
import { 
  LogOut, Plus, Trash2, Edit, MessageSquare, Briefcase, 
  Settings, LayoutDashboard, Globe, X, Save, 
  ArrowLeft, Terminal, Calendar, User, Mail, ShieldAlert, Award
} from 'lucide-react';

const Github = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  
  // Tabs: 'projects' | 'messages'
  const [activeTab, setActiveTab] = useState('projects');
  
  // Data States
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create' | 'edit'
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  // Form Fields for Project CRUD
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    technology: '', // stored as comma-separated string for editing
    githubLink: '',
    liveLink: '',
    image: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [operationLoading, setOperationLoading] = useState(false);

  // Verify Auth on entry
  useEffect(() => {
    const user = getCurrentUser();
    if (!user) {
      navigate('/login');
    } else {
      setCurrentUser(user);
    }
  }, [navigate]);

  // Load Dashboard Data
  const loadData = async () => {
    setLoading(true);
    try {
      const projs = await getProjects();
      const msgs = await getMessages();
      setProjects(projs);
      setMessages(msgs);
    } catch (err) {
      console.error("Failed to query dashboard database feeds:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (getCurrentUser()) {
      loadData();
    }
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Messages CRUD
  const handleDeleteMessage = async (id) => {
    if (window.confirm("Are you sure you want to permanently delete this visitor message?")) {
      try {
        await deleteMessage(id);
        setMessages(messages.filter(m => m._id !== id));
      } catch (err) {
        alert("Failed to delete message: " + (err.response?.data?.message || err.message));
      }
    }
  };

  // Projects CRUD Modals
  const openCreateModal = () => {
    setModalMode('create');
    setProjectForm({
      title: '',
      description: '',
      technology: '',
      githubLink: '',
      liveLink: '',
      image: ''
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const openEditModal = (proj) => {
    setModalMode('edit');
    setSelectedProjectId(proj._id);
    setProjectForm({
      title: proj.title,
      description: proj.description,
      technology: proj.technology.join(', '),
      githubLink: proj.githubLink || '',
      liveLink: proj.liveLink || '',
      image: proj.image || ''
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const validateProjectForm = () => {
    const errors = {};
    if (!projectForm.title.trim()) errors.title = 'Project title is required';
    if (!projectForm.description.trim()) errors.description = 'Description is required';
    if (!projectForm.technology.trim()) errors.technology = 'Technologies are required (comma separated)';
    return errors;
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    const errors = validateProjectForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setOperationLoading(true);

    // Format technologies from comma separated string to array
    const techArray = projectForm.technology
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const payload = {
      ...projectForm,
      technology: techArray
    };

    try {
      if (modalMode === 'create') {
        const newProj = await createProject(payload);
        setProjects([newProj, ...projects]);
      } else {
        const updatedProj = await updateProject(selectedProjectId, payload);
        setProjects(projects.map(p => p._id === selectedProjectId ? updatedProj : p));
      }
      setIsModalOpen(false);
    } catch (err) {
      alert("Failed to save project data: " + (err.response?.data?.message || err.message));
    } finally {
      setOperationLoading(false);
    }
  };

  const handleDeleteProject = async (id) => {
    if (window.confirm("Are you sure you want to permanently delete this project card from database?")) {
      try {
        await deleteProject(id);
        setProjects(projects.filter(p => p._id !== id));
      } catch (err) {
        alert("Failed to delete project: " + (err.response?.data?.message || err.message));
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg text-gray-950 dark:text-white transition-colors duration-300">
      
      {/* Header Panel */}
      <header className="glassmorphism sticky top-0 z-40 border-b border-gray-200 dark:border-dark-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-emerald-500" />
              <span className="font-extrabold text-lg tracking-wider bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                AKASH K. DASHBOARD
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-right">
              <p className="text-xs text-gray-400 font-bold">LOGGED IN AS</p>
              <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">{currentUser?.username || 'admin'}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-950/20 dark:text-red-300 dark:hover:bg-red-900/30 transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Panel Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        
        {/* Statistics Widgets */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          
          {/* Card 1: Total projects */}
          <div className="glassmorphism-card p-6 rounded-xl flex items-center gap-5 border border-blue-50/50 dark:border-slate-800">
            <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center border border-blue-100 dark:border-blue-900/50">
              <Briefcase className="w-6 h-6 text-blue-500" />
            </div>
            <div className="text-left">
              <span className="text-[10px] font-bold text-gray-400 block uppercase tracking-wider">Total Projects</span>
              <span className="text-3xl font-black">{loading ? '...' : projects.length}</span>
            </div>
          </div>

          {/* Card 2: Total messages */}
          <div className="glassmorphism-card p-6 rounded-xl flex items-center gap-5 border border-indigo-50/50 dark:border-slate-800">
            <div className="w-12 h-12 rounded-full bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center border border-indigo-100 dark:border-indigo-900/50">
              <MessageSquare className="w-6 h-6 text-indigo-500" />
            </div>
            <div className="text-left">
              <span className="text-[10px] font-bold text-gray-400 block uppercase tracking-wider">Unread Messages</span>
              <span className="text-3xl font-black">{loading ? '...' : messages.length}</span>
            </div>
          </div>

          {/* Card 3: Status check */}
          <div className="glassmorphism-card p-6 rounded-xl flex items-center gap-5 border border-emerald-50/50 dark:border-slate-800">
            <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center border border-emerald-100 dark:border-emerald-900/50">
              <Award className="w-6 h-6 text-emerald-500" />
            </div>
            <div className="text-left">
              <span className="text-[10px] font-bold text-gray-400 block uppercase tracking-wider">Database Link</span>
              <span className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">Connected Atlas</span>
            </div>
          </div>
        </section>

        {/* Tab Selection */}
        <section className="flex items-center gap-3 border-b border-gray-200 dark:border-dark-border pb-2.5">
          <button
            onClick={() => setActiveTab('projects')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'projects'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-500 hover:text-gray-800 dark:hover:text-white'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            Projects ({projects.length})
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'messages'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-500 hover:text-gray-800 dark:hover:text-white'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            Visitor Messages ({messages.length})
          </button>
        </section>

        {/* Dynamic Panels */}
        <section>
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
              <span className="text-xs text-gray-400 font-semibold">Pulling data indices...</span>
            </div>
          ) : (
            <div>
              {/* PROJECTS TAB */}
              {activeTab === 'projects' && (
                <div className="space-y-6 text-left animate-fade-in">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-black text-gray-950 dark:text-white">Active Projects Database</h3>
                      <p className="text-xs text-gray-400">Add, edit, or purge dynamic project items instantly.</p>
                    </div>
                    <button
                      onClick={openCreateModal}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md transition-transform active:scale-95 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      Add New Project
                    </button>
                  </div>

                  {projects.length === 0 ? (
                    <div className="p-10 text-center glassmorphism rounded-xl border border-dashed border-gray-300 dark:border-dark-border">
                      <p className="text-sm text-gray-400">No active projects found. Seed your database or add your first project.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {projects.map((proj) => (
                        <div
                          key={proj._id}
                          className="glassmorphism p-5 rounded-xl border border-gray-200 dark:border-dark-border/80 flex flex-col justify-between"
                        >
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <h4 className="font-extrabold text-base tracking-tight text-gray-950 dark:text-white truncate max-w-[70%]">
                                {proj.title}
                              </h4>
                              <div className="flex items-center gap-1.5">
                                <button
                                  onClick={() => openEditModal(proj)}
                                  className="p-1.5 rounded bg-gray-100 hover:bg-blue-100 hover:text-blue-600 dark:bg-dark-card dark:hover:bg-slate-800 transition-colors"
                                  title="Edit Project"
                                >
                                  <Edit className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleDeleteProject(proj._id)}
                                  className="p-1.5 rounded bg-red-50 hover:bg-red-100 text-red-600 dark:bg-red-950/20 dark:hover:bg-red-900/30 transition-colors"
                                  title="Delete Project"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>

                            <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-3 leading-relaxed">
                              {proj.description}
                            </p>

                            <div className="flex flex-wrap gap-1 mt-2">
                              {proj.technology.map((tech) => (
                                <span
                                  key={tech}
                                  className="px-2 py-0.5 rounded bg-gray-100 dark:bg-slate-800 text-[9px] font-mono text-gray-600 dark:text-gray-300"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="border-t border-gray-150 dark:border-dark-border mt-4 pt-3 flex items-center justify-between text-[11px] font-semibold text-gray-500">
                            <span className="flex items-center gap-1">
                              <Github className="w-3 h-3" />
                              {proj.githubLink ? 'Code Connected' : 'Private Repo'}
                            </span>
                            <span className="flex items-center gap-1">
                              <Globe className="w-3 h-3" />
                              {proj.liveLink ? 'Live Deployment' : 'Local'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* MESSAGES TAB */}
              {activeTab === 'messages' && (
                <div className="space-y-6 text-left animate-fade-in">
                  <div>
                    <h3 className="text-lg font-black text-gray-950 dark:text-white">Visitor Messages Inbox</h3>
                    <p className="text-xs text-gray-400">Receive letters directly from your contact form submission.</p>
                  </div>

                  {messages.length === 0 ? (
                    <div className="p-10 text-center glassmorphism rounded-xl border border-dashed border-gray-300 dark:border-dark-border">
                      <p className="text-sm text-gray-400">Your messaging box is completely empty.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {messages.map((msg) => (
                        <div
                          key={msg._id}
                          className="glassmorphism p-5 rounded-xl border border-gray-200 dark:border-dark-border relative flex flex-col space-y-3"
                        >
                          {/* Delete */}
                          <button
                            onClick={() => handleDeleteMessage(msg._id)}
                            className="absolute top-4 right-4 p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 dark:bg-red-950/20 dark:hover:bg-red-900/30 transition-colors cursor-pointer"
                            title="Delete Message"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>

                          {/* Sender Detail */}
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4 text-xs font-bold border-b border-gray-100 dark:border-dark-border/40 pb-2 max-w-[90%]">
                            <span className="flex items-center gap-1 text-gray-800 dark:text-gray-200">
                              <User className="w-3.5 h-3.5 text-blue-500" />
                              {msg.name}
                            </span>
                            <span className="flex items-center gap-1 text-gray-500">
                              <Mail className="w-3.5 h-3.5 text-indigo-500" />
                              {msg.email}
                            </span>
                            <span className="flex items-center gap-1 text-gray-400 font-medium font-mono">
                              <Calendar className="w-3.5 h-3.5 text-purple-500" />
                              {new Date(msg.createdAt || msg.updatedAt).toLocaleString()}
                            </span>
                          </div>

                          {/* Subject & content */}
                          <div className="space-y-1.5">
                            <h4 className="font-extrabold text-sm text-gray-900 dark:text-white">
                              Subject: {msg.subject}
                            </h4>
                            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed font-medium bg-gray-50/50 dark:bg-dark-card/30 p-3.5 rounded-lg border border-gray-100 dark:border-slate-800/80">
                              {msg.message}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </section>
      </main>

      {/* Dynamic Modal to Create/Edit Projects */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="glassmorphism w-full max-w-lg rounded-2xl shadow-2xl border border-gray-200 dark:border-dark-border/80 overflow-hidden animate-zoom-in">
            <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-dark-border bg-white/40 dark:bg-dark-card/40">
              <h3 className="font-black text-base text-gray-950 dark:text-white">
                {modalMode === 'create' ? 'Add New Project' : 'Edit Project Details'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleProjectSubmit} className="p-6 space-y-4 text-left">
              {/* Title */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase">Project Title</label>
                <input
                  type="text"
                  value={projectForm.title}
                  onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                  className={`w-full px-3 py-2 rounded-lg border text-xs bg-white dark:bg-dark-card focus:outline-none focus:ring-2 transition-all ${
                    formErrors.title ? 'border-red-500 focus:ring-red-400' : 'border-gray-200 dark:border-dark-border focus:ring-blue-400'
                  }`}
                  placeholder="e.g. Smart Healthcare Portal"
                />
                {formErrors.title && <span className="text-[10px] text-red-500 font-medium">{formErrors.title}</span>}
              </div>

              {/* Technologies */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase">Technologies (Comma separated)</label>
                <input
                  type="text"
                  value={projectForm.technology}
                  onChange={(e) => setProjectForm({ ...projectForm, technology: e.target.value })}
                  className={`w-full px-3 py-2 rounded-lg border text-xs bg-white dark:bg-dark-card focus:outline-none focus:ring-2 transition-all ${
                    formErrors.technology ? 'border-red-500 focus:ring-red-400' : 'border-gray-200 dark:border-dark-border focus:ring-blue-400'
                  }`}
                  placeholder="React.js, Express.js, MongoDB, Node.js"
                />
                {formErrors.technology && <span className="text-[10px] text-red-500 font-medium">{formErrors.technology}</span>}
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase">Project Description</label>
                <textarea
                  rows="3"
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  className={`w-full px-3 py-2 rounded-lg border text-xs bg-white dark:bg-dark-card focus:outline-none focus:ring-2 transition-all ${
                    formErrors.description ? 'border-red-500 focus:ring-red-400' : 'border-gray-200 dark:border-dark-border focus:ring-blue-400'
                  }`}
                  placeholder="Enter detailed description..."
                />
                {formErrors.description && <span className="text-[10px] text-red-500 font-medium">{formErrors.description}</span>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* GitHub link */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase">GitHub Repository Link</label>
                  <input
                    type="url"
                    value={projectForm.githubLink}
                    onChange={(e) => setProjectForm({ ...projectForm, githubLink: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-dark-border text-xs bg-white dark:bg-dark-card focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                    placeholder="https://github.com/..."
                  />
                </div>

                {/* Live Demo link */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase">Live Demo Link</label>
                  <input
                    type="url"
                    value={projectForm.liveLink}
                    onChange={(e) => setProjectForm({ ...projectForm, liveLink: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-dark-border text-xs bg-white dark:bg-dark-card focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                    placeholder="https://example.com"
                  />
                </div>
              </div>

              {/* Image URL */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase">Project Card Image (URL)</label>
                <input
                  type="text"
                  value={projectForm.image}
                  onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-dark-border text-xs bg-white dark:bg-dark-card focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              {/* Actions */}
              <div className="border-t border-gray-200 dark:border-dark-border pt-4 mt-6 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-xs font-semibold transition-all active:scale-95 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={operationLoading}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  {operationLoading ? 'Saving...' : 'Save Database'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
