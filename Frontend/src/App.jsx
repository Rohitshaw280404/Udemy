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
import { courses, students } from './data/mockData.js';

const defaultRoute = '/';

function getRoute() {
  const hash = window.location.hash.replace('#', '');
  return hash || defaultRoute;
}

function navigate(path) {
  window.location.hash = path;
}

function Navbar() {
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
          <button className={navButtonClass} type="button" onClick={() => navigate('/login')}>Login</button>
          <button className={navButtonClass} type="button" onClick={() => navigate('/register')}>Register</button>
          <button className={navButtonClass} type="button" onClick={() => navigate('/dashboard/student')}>My Learning</button>
          <button className={navButtonClass} type="button" onClick={() => navigate('/dashboard/instructor/create')}>Teach</button>
        </nav>
      </div>
    </header>
  );
}

function App() {
  const [route, setRoute] = useState(getRoute());
  const [enrolledCourseIds, setEnrolledCourseIds] = useState(['react-fundamentals']);

  useEffect(() => {
    const onHashChange = () => setRoute(getRoute());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const enrolledCourses = useMemo(
    () => courses.filter((course) => enrolledCourseIds.includes(course.id)),
    [enrolledCourseIds],
  );

  const handleEnroll = (courseId) => {
    setEnrolledCourseIds((prev) => (prev.includes(courseId) ? prev : [...prev, courseId]));
    navigate('/dashboard/student');
  };

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
    const courseId = route.split('/')[2];
    const course = courses.find((item) => item.id === courseId);
    page = (
      <Coursedetails
        course={course}
        onBack={() => navigate('/courses')}
        onEnroll={handleEnroll}
      />
    );
  } else if (route === '/login') {
    page = <Login onSwitchToRegister={() => navigate('/register')} />;
  } else if (route === '/register') {
    page = <Register onSwitchToLogin={() => navigate('/login')} />;
  } else if (route === '/dashboard/student') {
    page = <Mycourse courses={enrolledCourses} onBrowseCourses={() => navigate('/courses')} />;
  } else if (route === '/dashboard/instructor/create') {
    page = <Createcourse onAddLecture={() => navigate('/dashboard/instructor/add-lecture')} />;
  } else if (route === '/dashboard/instructor/add-lecture') {
    page = <Addlecture onSeeStudents={() => navigate('/dashboard/instructor/students')} />;
  } else if (route === '/dashboard/instructor/students') {
    page = <Seestudent students={students} />;
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
      <Navbar />
      <main className="mx-auto w-[min(1100px,92%)] py-6 md:py-8">{page}</main>
    </div>
  );
}

export default App;
