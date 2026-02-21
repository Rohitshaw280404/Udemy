const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

async function request(path, { method = "GET", token, body } = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.message || "Request failed");
  }
  return payload;
}

export const api = {
  register: (body) => request("/users/register", { method: "POST", body }),
  login: (body) => request("/users/login", { method: "POST", body }),
  getMe: (token) => request("/users/me", { token }),
  getCourses: () => request("/courses"),
  getCourseById: (courseId) => request(`/courses/${courseId}`),
  createCourse: (token, body) => request("/courses", { method: "POST", token, body }),
  getInstructorCourses: (token) => request("/courses/instructor/mine", { token }),
  addLecture: (token, courseId, body) =>
    request(`/courses/${courseId}/lectures`, { method: "POST", token, body }),
  enrollInCourse: (token, courseId) =>
    request(`/enrollments/${courseId}`, { method: "POST", token }),
  getMyEnrollments: (token) => request("/enrollments/me", { token }),
  getCourseStudents: (token, courseId) =>
    request(`/enrollments/course/${courseId}/students`, { token }),
};
