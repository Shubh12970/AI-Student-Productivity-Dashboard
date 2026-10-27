import { useState, type FormEvent } from "react";
import {
  LayoutDashboard,
  CalendarDays,
  CheckSquare,
  BookOpen,
  BarChart3,
  Settings,
  Search,
  Bell,
  Plus,
  ChevronDown,
  Clock3,
  ArrowUpRight,
  CircleCheck,
  Circle,
  Sparkles,
  Menu,
  X,
  Flame,
  Target,
  MoreHorizontal,
  GraduationCap,
} from "lucide-react";
import "./App.css";

type Task = {
  id: number;
  title: string;
  subject: string;
  time: string;
  priority: "High" | "Medium" | "Low";
  completed: boolean;
};

const initialTasks: Task[] = [
  {
    id: 1,
    title: "Complete Signals & Systems assignment",
    subject: "Electronics",
    time: "Today, 6:00 PM",
    priority: "High",
    completed: false,
  },
  {
    id: 2,
    title: "Revise semiconductor physics",
    subject: "Semiconductors",
    time: "Today, 8:00 PM",
    priority: "Medium",
    completed: false,
  },
  {
    id: 3,
    title: "Practice React components",
    subject: "Web Development",
    time: "Tomorrow, 10:00 AM",
    priority: "High",
    completed: false,
  },
  {
    id: 4,
    title: "Review yesterday's lecture notes",
    subject: "General",
    time: "Completed yesterday",
    priority: "Low",
    completed: true,
  },
];

const week = [
  { day: "Mon", value: 45 },
  { day: "Tue", value: 72 },
  { day: "Wed", value: 55 },
  { day: "Thu", value: 88 },
  { day: "Fri", value: 64 },
  { day: "Sat", value: 95 },
  { day: "Sun", value: 38 },
];

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [activePage, setActivePage] = useState("Dashboard");
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskSubject, setNewTaskSubject] = useState("");
  const [newTaskPriority, setNewTaskPriority] =
    useState<Task["priority"]>("Medium");

  const completedCount = tasks.filter((task) => task.completed).length;
  const pendingCount = tasks.length - completedCount;
  const completionRate =
    tasks.length === 0 ? 0 : Math.round((completedCount / tasks.length) * 100);

  const visibleTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.subject.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" ||
      (filter === "Pending" && !task.completed) ||
      (filter === "Completed" && task.completed);

    return matchesSearch && matchesFilter;
  });

  function toggleTask(id: number) {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

function addTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!newTaskTitle.trim()) return;

    const task: Task = {
      id: Date.now(),
      title: newTaskTitle.trim(),
      subject: newTaskSubject.trim() || "General",
      time: "No deadline set",
      priority: newTaskPriority,
      completed: false,
    };

    setTasks((current) => [task, ...current]);
    setNewTaskTitle("");
    setNewTaskSubject("");
    setNewTaskPriority("Medium");
    setShowTaskForm(false);
    setFilter("All");
    setActivePage("Tasks");
  }

  const navigation = [
    { label: "Dashboard", icon: LayoutDashboard },
    { label: "My Tasks", icon: CheckSquare },
    { label: "Study Planner", icon: BookOpen },
    { label: "Calendar", icon: CalendarDays },
    { label: "Analytics", icon: BarChart3 },
  ];

  return (
    <div className="app-shell">
      {sidebarOpen && (
        <button
          className="sidebar-backdrop"
          aria-label="Close navigation"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
        <div className="brand">
          <div className="brand-icon">
            <GraduationCap size={23} />
          </div>
          <div>
            <span className="brand-name">StudyFlow</span>
            <span className="brand-caption">STUDENT WORKSPACE</span>
          </div>
          <button
            className="icon-button sidebar-close"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X size={19} />
          </button>
        </div>

        <div className="workspace-label">WORKSPACE</div>

        <nav className="navigation" aria-label="Main navigation">
          {navigation.map(({ label, icon: Icon }) => (
            <button
              key={label}
              className={`nav-item ${activePage === label ? "nav-active" : ""}`}
              onClick={() => {
                setActivePage(label);
                setSidebarOpen(false);
              }}
            >
              <Icon size={19} strokeWidth={1.8} />
              <span>{label}</span>
              {label === "My Tasks" && (
                <span className="nav-count">{pendingCount}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="sidebar-divider" />

        <div className="workspace-label">PERSONAL</div>
        <button className="nav-item" onClick={() => setActivePage("Settings")}>
          <Settings size={19} strokeWidth={1.8} />
          <span>Settings</span>
        </button>

        <div className="sidebar-spacer" />

        <div className="upgrade-card">
          <div className="upgrade-icon">
            <Sparkles size={19} />
          </div>
          <h3>Study smarter with AI</h3>
          <p>Turn large assignments into manageable study steps.</p>
          <button
            className="upgrade-button"
            onClick={() => setActivePage("Study Planner")}
          >
            Explore study planner <ArrowUpRight size={15} />
          </button>
        </div>

        <div className="profile">
          <div className="avatar">S</div>
          <div className="profile-info">
            <strong>Student</strong>
            <span>My workspace</span>
          </div>
          <ChevronDown size={17} className="profile-chevron" />
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <div className="topbar-left">
            <button
              className="icon-button mobile-menu"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open navigation"
            >
              <Menu size={22} />
            </button>
            <div className="breadcrumb">
              <span>Workspace</span>
              <span className="breadcrumb-slash">/</span>
              <strong>{activePage}</strong>
            </div>
          </div>

          <div className="topbar-right">
            <label className="search-box">
              <Search size={17} />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search tasks..."
                aria-label="Search tasks"
              />
              <kbd>⌘ K</kbd>
            </label>
            <button
              className="icon-button notification-button"
              aria-label="Notifications"
              title="Notifications"
            >
              <Bell size={19} />
              <span className="notification-dot" />
            </button>
            <div className="top-avatar">S</div>
          </div>
        </header>

        <div className="page-content">
          {activePage === "Dashboard" || activePage === "My Tasks" ? (
            <>
              <section className="welcome-section">
                <div>
                  <div className="eyebrow">
                    <span className="eyebrow-dot" />
                    YOUR PERSONAL STUDY SPACE
                  </div>
                  <h1>
                    {activePage === "Dashboard"
                      ? "Good to see you!"
                      : "Your tasks"}
                    <span className="wave">✦</span>
                  </h1>
                  <p>
                    {activePage === "Dashboard"
                      ? "Make today count. One small step at a time."
                      : "Stay organized and keep moving forward."}
                  </p>
                </div>
                <button
                  className="primary-button"
                  onClick={() => setShowTaskForm(true)}
                >
                  <Plus size={18} /> Add new task
                </button>
              </section>

              <section className="stats-grid" aria-label="Task statistics">
                <article className="stat-card">
                  <div className="stat-top">
                    <span>Total tasks</span>
                    <div className="stat-icon purple">
                      <CheckSquare size={19} />
                    </div>
                  </div>
                  <div className="stat-value">{tasks.length}</div>
                  <div className="stat-foot">
                    <span className="stat-note">Across your workspace</span>
                  </div>
                </article>

                <article className="stat-card">
                  <div className="stat-top">
                    <span>Completed</span>
                    <div className="stat-icon green">
                      <CircleCheck size={19} />
                    </div>
                  </div>
                  <div className="stat-value">{completedCount}</div>
                  <div className="stat-foot">
                    <span className="stat-positive">
                      <ArrowUpRight size={14} /> {completionRate}%
                    </span>
                    <span className="stat-note">completion rate</span>
                  </div>
                </article>

                <article className="stat-card">
                  <div className="stat-top">
                    <span>Pending tasks</span>
                    <div className="stat-icon orange">
                      <Clock3 size={19} />
                    </div>
                  </div>
                  <div className="stat-value">{pendingCount}</div>
                  <div className="stat-foot">
                    <span className="stat-note">Ready for your focus</span>
                  </div>
                </article>

                <article className="stat-card">
                  <div className="stat-top">
                    <span>Study streak</span>
                    <div className="stat-icon pink">
                      <Flame size={19} />
                    </div>
                  </div>
                  <div className="stat-value">
                    5 <span className="stat-unit">days</span>
                  </div>
                  <div className="stat-foot">
                    <span className="stat-note">Keep the momentum going!</span>
                  </div>
                </article>
              </section>

              <section className="content-grid">
                <article className="panel tasks-panel">
                  <div className="panel-header">
                    <div>
                      <h2>
                        {activePage === "Dashboard"
                          ? "Your tasks"
                          : "Task manager"}
                      </h2>
                      <p>Keep track of what matters today.</p>
                    </div>
                    <button
                      className="subtle-button"
                      onClick={() => setActivePage("My Tasks")}
                    >
                      View all <ArrowUpRight size={15} />
                    </button>
                  </div>

                  <div className="task-filters" role="group" aria-label="Filter tasks">
                    {["All", "Pending", "Completed"].map((item) => (
                      <button
                        key={item}
                        onClick={() => setFilter(item)}
                        className={`filter-button ${
                          filter === item ? "filter-active" : ""
                        }`}
                      >
                        {item}
                        {item === "All" && (
                          <span className="filter-count">{tasks.length}</span>
                        )}
                      </button>
                    ))}
                  </div>

                  <div className="task-list">
                    {visibleTasks.length > 0 ? (
                      visibleTasks.map((task) => (
                        <div
                          className={`task-row ${
                            task.completed ? "task-completed" : ""
                          }`}
                          key={task.id}
                        >
                          <button
                            className="task-check"
                            onClick={() => toggleTask(task.id)}
                            aria-label={
                              task.completed
                                ? `Mark ${task.title} incomplete`
                                : `Complete ${task.title}`
                            }
                          >
                            {task.completed ? (
                              <CircleCheck size={21} className="checked-icon" />
                            ) : (
                              <Circle size={21} />
                            )}
                          </button>
                          <div className="task-main">
                            <span className="task-title">{task.title}</span>
                            <div className="task-meta">
                              <span>{task.subject}</span>
                              <span className="meta-dot" />
                              <span>{task.time}</span>
                            </div>
                          </div>
                          <span
                            className={`priority priority-${task.priority.toLowerCase()}`}
                          >
                            {task.priority}
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="empty-state">
                        <CheckSquare size={28} />
                        <strong>No tasks found</strong>
                        <span>Try another filter or add a new task.</span>
                      </div>
                    )}
                  </div>

                  <button
                    className="add-task-link"
                    onClick={() => setShowTaskForm(true)}
                  >
                    <Plus size={17} /> Add another task
                  </button>
                </article>

                <div className="right-column">
                  <article className="panel progress-panel">
                    <div className="panel-header">
                      <div>
                        <h2>Weekly progress</h2>
                        <p>Your productivity at a glance.</p>
                      </div>
                      <button
                        className="icon-button more-button"
                        aria-label="More progress options"
                        title="Weekly progress"
                      >
                        <MoreHorizontal size={21} />
                      </button>
                    </div>

                    <div className="chart-summary">
                      <span className="chart-number">{completionRate}%</span>
                      <span className="chart-change">
                        <Target size={15} /> Tasks completed
                      </span>
                    </div>

                    <div
                      className="bar-chart"
                      role="img"
                      aria-label="Illustrative weekly productivity: Monday 45, Tuesday 72, Wednesday 55, Thursday 88, Friday 64, Saturday 95, Sunday 38."
                    >
                      {week.map((item) => (
                        <div className="chart-column" key={item.day}>
                          <div className="bar-track">
                            <div
                              className={`bar ${
                                item.day === "Sat" ? "bar-highlight" : ""
                              }`}
                              style={{ height: `${item.value}%` }}
                            />
                          </div>
                          <span
                            className={`bar-label ${
                              item.day === "Sat" ? "bar-label-active" : ""
                            }`}
                          >
                            {item.day}
                          </span>
                        </div>
                      ))}
                    </div>
                    <p className="chart-footnote">
                      <span className="chart-legend-dot" />
                      Sample weekly activity · replace with real data later
                    </p>
                  </article>

                  <article className="focus-card">
                    <div className="focus-card-top">
                      <div className="focus-icon">
                        <Sparkles size={19} />
                      </div>
                      <span>YOUR NEXT STEP</span>
                    </div>
                    <h3>Big assignment ahead?</h3>
                    <p>
                      Break it down into smaller steps and build a study plan
                      that works for you.
                    </p>
                    <button
                      className="focus-button"
                      onClick={() => setActivePage("Study Planner")}
                    >
                      Explore AI study planner <ArrowUpRight size={16} />
                    </button>
                  </article>
                </div>
              </section>

              <footer className="page-footer">
                <span>Made for focused minds.</span>
                <span>StudyFlow · Your learning, organized.</span>
              </footer>
            </>
          ) : (
            <section className="placeholder-page">
              <div className="placeholder-icon">
                {activePage === "Study Planner" ? (
                  <Sparkles size={28} />
                ) : activePage === "Calendar" ? (
                  <CalendarDays size={28} />
                ) : activePage === "Analytics" ? (
                  <BarChart3 size={28} />
                ) : (
                  <Settings size={28} />
                )}
              </div>
              <h1>{activePage}</h1>
              <p>
                This section is part of our project roadmap. We'll build it
                step by step after the dashboard foundation.
              </p>
              <button
                className="primary-button"
                onClick={() => setActivePage("Dashboard")}
              >
                <LayoutDashboard size={17} /> Back to dashboard
              </button>
            </section>
          )}
        </div>
      </main>

      {showTaskForm && (
        <div
          className="modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowTaskForm(false);
            }
          }}
        >
          <section
            className="task-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="task-modal-title"
          >
            <div className="modal-header">
              <div>
                <span className="eyebrow">STAY ORGANIZED</span>
                <h2 id="task-modal-title">Create a task</h2>
              </div>
              <button
                className="icon-button"
                onClick={() => setShowTaskForm(false)}
                aria-label="Close form"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={addTask} className="task-form">
              <label>
                Task title
                <input
                  autoFocus
                  value={newTaskTitle}
                  onChange={(event) => setNewTaskTitle(event.target.value)}
                  placeholder="e.g. Exact Task to perform"
                  required
                  maxLength={120}
                />
              </label>
              <label>
                Subject or category
                <input
                  value={newTaskSubject}
                  onChange={(event) => setNewTaskSubject(event.target.value)}
                  placeholder="e.g. Subject the task falls under"
                  maxLength={60}
                />
              </label>
              <label>
                Priority
                <select
                  value={newTaskPriority}
                  onChange={(event) =>
                    setNewTaskPriority(event.target.value as Task["priority"])
                  }
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </label>
              <div className="modal-actions">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => setShowTaskForm(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="primary-button">
                  <Plus size={17} /> Create task
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}

export default App;