import { useEffect, useMemo, useState } from 'react';
import { Home } from './Pages/Public pages/Home.jsx';
import { Courselisting } from './Pages/Public pages/courselisting.jsx';
import { Coursedetails } from './Pages/Public pages/coursedetails.jsx';
import { Login } from './Pages/Auth pages/Login.jsx';
import { Register } from './Pages/Auth pages/Register.jsx';
import { Mycourse } from './Pages/Student Dashboard/Mycourse.jsx';
import { Createcourse } from './Pages/Instructor Dashboard/Createcouse.jsx';
import { Addlecture } from './Pages/Instructor Dashboard/Addlecture.jsx';
import { Seestudent } from './Pages/Instructor Dashboard/Seestudent.jsx';
import { api } from './api/index.js';

const defaultRoute = '/';
const AUTH_STORAGE_KEY = 'learnhub_auth';

function getRoute() {
  const hash = window.location.hash.replace('#', '');
  return hash || defaultRoute;
}

function navigate(path) {
  window.location.hash = path;
}

function getStoredAuth() {
  const raw = localStorage.getItem(AUTH_STORAGE_KEY);
  if (!raw) return { token: '', user: null };
  try {
    const parsed = JSON.parse(raw);
    return { token: parsed.token || '', user: parsed.user || null };
  } catch {
    return { token: '', user: null };
  }
}

function Navbar({ user, onLogout }) {
  const navButtonClass =
    'rounded-full border border-slate-300/80 bg-white/80 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:border-teal-500 hover:text-teal-700';

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/85 backdrop-blur">
      <div className="mx-auto flex w-[min(1100px,92%)] flex-wrap items-center justify-between gap-3 py-3">
        <button
          className="text-xl font-extrabold tracking-tight text-slate-900"
          type="button"
          onClick={() => navigate('/')}
        >
          LearnHub
        </button>
        <nav className="flex flex-wrap gap-2">
          <button className={navButtonClass} type="button" onClick={() => navigate('/courses')}>Courses</button>
          {!user ? <button className={navButtonClass} type="button" onClick={() => navigate('/login')}>Login</button> : null}
          {!user ? <button className={navButtonClass} type="button" onClick={() => navigate('/register')}>Register</button> : null}
          {user?.role === 'student' ? (
            <button className={navButtonClass} type="button" onClick={() => navigate('/dashboard/student')}>My Learning</button>
          ) : null}
          {user?.role === 'instructor' ? (
            <button className={navButtonClass} type="button" onClick={() => navigate('/dashboard/instructor/create')}>Teach</button>
          ) : null}
          {user ? (
            <button className={navButtonClass} type="button" onClick={onLogout}>Logout</button>
          ) : null}
        </nav>
      </div>
    </header>
  );
}

function App() {
  const [route, setRoute] = useState(getRoute());
  const [auth, setAuth] = useState(getStoredAuth());
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [instructorCourses, setInstructorCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [selectedCourseStudents, setSelectedCourseStudents] = useState([]);
  const [selectedStudentsCourseTitle, setSelectedStudentsCourseTitle] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [courseActionLoading, setCourseActionLoading] = useState(false);
  const [enrolling, setEnrolling] = useState(false);
  const currentCourseId = route.startsWith('/courses/') ? route.split('/')[2] : '';

  useEffect(() => {
    const onHashChange = () => setRoute(getRoute());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth));
  }, [auth]);

  const fetchCourses = async () => {
    const data = await api.getCourses();
    setCourses(data.courses || []);
  };

  const fetchMyEnrollments = async (token) => {
    const data = await api.getMyEnrollments(token);
    setEnrollments(data.enrollments || []);
  };

  const fetchInstructorCourses = async (token) => {
    const data = await api.getInstructorCourses(token);
    const list = data.courses || [];
    setInstructorCourses(list);
    if (!selectedCourseId && list.length > 0) {
      setSelectedCourseId(list[0]._id);
    }
  };

  useEffect(() => {
    fetchCourses().catch((error) => console.error(error.message));
  }, []);

  useEffect(() => {
    if (!auth.token) return;
    api.getMe(auth.token)
      .then((data) => setAuth((prev) => ({ ...prev, user: data.user })))
      .catch(() => setAuth({ token: '', user: null }));
  }, [auth.token]);

  useEffect(() => {
    if (!auth.token || !auth.user) return;
    if (auth.user.role === 'student') {
      fetchMyEnrollments(auth.token).catch((error) => console.error(error.message));
    }
    if (auth.user.role === 'instructor') {
      fetchInstructorCourses(auth.token).catch((error) => console.error(error.message));
    }
  }, [auth.token, auth.user?.role]);

  useEffect(() => {
    if (route !== '/dashboard/instructor/students' || !selectedCourseId || !auth.token) return;

    api.getCourseStudents(auth.token, selectedCourseId)
      .then((data) => {
        setSelectedCourseStudents(data.enrollments || []);
        setSelectedStudentsCourseTitle(data.course?.title || '');
      })
      .catch((error) => {
        setSelectedCourseStudents([]);
        setSelectedStudentsCourseTitle('');
        console.error(error.message);
      });
  }, [route, selectedCourseId, auth.token]);

  const handleLogout = () => {
    setAuth({ token: '', user: null });
    setEnrollments([]);
    setInstructorCourses([]);
    setSelectedCourseId('');
    navigate('/');
  };

  const handleRegister = async (form) => {
    setAuthLoading(true);
    try {
      const data = await api.register(form);
      setAuth({ token: data.token, user: data.user });
      await fetchCourses();
      navigate(data.user.role === 'instructor' ? '/dashboard/instructor/create' : '/dashboard/student');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogin = async (form) => {
    setAuthLoading(true);
    try {
      const data = await api.login(form);
      setAuth({ token: data.token, user: data.user });
      if (data.user.role === 'student') {
        await fetchMyEnrollments(data.token);
        navigate('/dashboard/student');
      } else {
        await fetchInstructorCourses(data.token);
        navigate('/dashboard/instructor/create');
      }
    } finally {
      setAuthLoading(false);
    }
  };

  const handleEnroll = async (courseId) => {
    if (!auth.token) {
      navigate('/login');
      return;
    }
    if (auth.user?.role !== 'student') {
      alert('Only student accounts can enroll');
      return;
    }

    setEnrolling(true);
    try {
      await api.enrollInCourse(auth.token, courseId);
      await Promise.all([fetchMyEnrollments(auth.token), fetchCourses()]);
      navigate('/dashboard/student');
    } catch (error) {
      alert(error.message);
    } finally {
      setEnrolling(false);
    }
  };

  const handleCreateCourse = async (form) => {
    if (!auth.token) {
      navigate('/login');
      return;
    }

    setCourseActionLoading(true);
    try {
      const data = await api.createCourse(auth.token, form);
      await Promise.all([fetchCourses(), fetchInstructorCourses(auth.token)]);
      setSelectedCourseId(data.course?._id || '');
    } finally {
      setCourseActionLoading(false);
    }
  };

  const handlePublishLecture = async (lecture) => {
    if (!auth.token || !selectedCourseId) return;
    setCourseActionLoading(true);
    try {
      await api.addLecture(auth.token, selectedCourseId, lecture);
      await Promise.all([fetchCourses(), fetchInstructorCourses(auth.token)]);
    } finally {
      setCourseActionLoading(false);
    }
  };

  const currentCourse = useMemo(
    () => courses.find((item) => (item._id || item.id) === currentCourseId),
    [courses, currentCourseId],
  );

  let page;

  if (route === '/') {
    page = (
      <Home
        featuredCourses={courses.slice(0, 3)}
        onBrowseCourses={() => navigate('/courses')}
        onOpenCourse={(id) => navigate(`/courses/${id}`)}
      />
    );
  } else if (route === '/courses') {
    page = <Courselisting courses={courses} onOpenCourse={(id) => navigate(`/courses/${id}`)} />;
  } else if (route.startsWith('/courses/')) {
    page = (
      <Coursedetails
        course={currentCourse}
        onBack={() => navigate('/courses')}
        onEnroll={handleEnroll}
        enrolling={enrolling}
      />
    );
  } else if (route === '/login') {
    page = (
      <Login
        onSwitchToRegister={() => navigate('/register')}
        onLogin={handleLogin}
        loading={authLoading}
      />
    );
  } else if (route === '/register') {
    page = (
      <Register
        onSwitchToLogin={() => navigate('/login')}
        onRegister={handleRegister}
        loading={authLoading}
      />
    );
  } else if (route === '/dashboard/student') {
    page =
      auth.user?.role === 'student' ? (
        <Mycourse enrollments={enrollments} onBrowseCourses={() => navigate('/courses')} />
      ) : (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-700 shadow-sm">
          Student dashboard is only available for student accounts.
        </section>
      );
  } else if (route === '/dashboard/instructor/create') {
    page =
      auth.user?.role === 'instructor' ? (
        <Createcourse
          onCreateCourse={handleCreateCourse}
          courses={instructorCourses}
          selectedCourseId={selectedCourseId}
          onSelectCourse={setSelectedCourseId}
          onAddLecture={() => navigate('/dashboard/instructor/add-lecture')}
          loading={courseActionLoading}
        />
      ) : (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-700 shadow-sm">
          Instructor dashboard is only available for instructor accounts.
        </section>
      );
  } else if (route === '/dashboard/instructor/add-lecture') {
    page =
      auth.user?.role === 'instructor' ? (
        <Addlecture
          courses={instructorCourses}
          selectedCourseId={selectedCourseId}
          onSelectCourse={setSelectedCourseId}
          onPublishLecture={handlePublishLecture}
          onSeeStudents={() => navigate('/dashboard/instructor/students')}
          loading={courseActionLoading}
        />
      ) : (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-700 shadow-sm">
          Instructor dashboard is only available for instructor accounts.
        </section>
      );
  } else if (route === '/dashboard/instructor/students') {
    page =
      auth.user?.role === 'instructor' ? (
        <Seestudent students={selectedCourseStudents} courseTitle={selectedStudentsCourseTitle} />
      ) : (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-700 shadow-sm">
          Instructor dashboard is only available for instructor accounts.
        </section>
      );
  } else {
    page = (
      <section className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
        <h2 className="mb-3 text-2xl font-bold text-slate-900">Page not found</h2>
        <button
          type="button"
          className="rounded-lg bg-teal-700 px-4 py-2 font-medium text-white transition hover:bg-teal-800"
          onClick={() => navigate('/')}
        >
          Go Home
        </button>
      </section>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar user={auth.user} onLogout={handleLogout} />
      <main className="mx-auto w-[min(1100px,92%)] py-6 md:py-8">{page}</main>
    </div>
  );
}

export default App;
