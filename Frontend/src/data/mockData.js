export const courses = [
  {
    id: 'react-fundamentals',
    title: 'React Fundamentals',
    category: 'Web Development',
    level: 'Beginner',
    duration: '8h 30m',
    description: 'Learn components, props, state, and hooks by building practical UI projects.',
    rating: 4.7,
    price: 49,
    students: 12430,
    instructor: 'Sarah Khan',
    lectures: [
      'Welcome and course overview',
      'JSX and rendering basics',
      'Props and component composition',
      'State management with hooks',
      'Mini project: interactive dashboard'
    ]
  },
  {
    id: 'node-api-masterclass',
    title: 'Node API Masterclass',
    category: 'Backend Development',
    level: 'Intermediate',
    duration: '10h 15m',
    description: 'Build secure REST APIs with Express, middleware patterns, and database integration.',
    rating: 4.6,
    price: 59,
    students: 8930,
    instructor: 'Daniel Brooks',
    lectures: [
      'Designing API architecture',
      'Express routing patterns',
      'Authentication and authorization',
      'Validation and error handling',
      'Deploying to production'
    ]
  },
  {
    id: 'ui-ux-design-essentials',
    title: 'UI/UX Design Essentials',
    category: 'Design',
    level: 'Beginner',
    duration: '6h 40m',
    description: 'Understand visual hierarchy, usability principles, and prototype modern product interfaces.',
    rating: 4.8,
    price: 39,
    students: 15220,
    instructor: 'Emily Chen',
    lectures: [
      'Design thinking foundations',
      'Wireframing user flows',
      'Typography and spacing systems',
      'Color, accessibility, and contrast',
      'Prototype and feedback cycles'
    ]
  },
  {
    id: 'python-data-analysis',
    title: 'Python for Data Analysis',
    category: 'Data Science',
    level: 'Intermediate',
    duration: '9h 05m',
    description: 'Use pandas and visualization tools to clean datasets and generate clear business insights.',
    rating: 4.5,
    price: 69,
    students: 7410,
    instructor: 'Michael Rivera',
    lectures: [
      'NumPy and pandas refresher',
      'Data cleaning workflows',
      'Exploratory data analysis',
      'Visualization with matplotlib',
      'Capstone analysis project'
    ]
  }
];

export const students = [
  {
    name: 'Ava Thompson',
    email: 'ava.thompson@example.com',
    course: 'React Fundamentals',
    progress: '42%'
  },
  {
    name: 'Liam Johnson',
    email: 'liam.johnson@example.com',
    course: 'Node API Masterclass',
    progress: '68%'
  },
  {
    name: 'Noah Williams',
    email: 'noah.williams@example.com',
    course: 'UI/UX Design Essentials',
    progress: '25%'
  },
  {
    name: 'Sophia Martinez',
    email: 'sophia.martinez@example.com',
    course: 'Python for Data Analysis',
    progress: '81%'
  }
];
