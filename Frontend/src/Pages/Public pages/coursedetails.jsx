import './index.css';
export function Createcourse() {
    return (
        <div className='course-details'>
            <h1 className='course-details-heading'>Course Details</h1> 
            <div className='course-details-content'>
                <h2 className='course-title'>Course Title: Introduction to Web Development</h2>
                <p className='course-description'>Course Description: This course provides an introduction to web development, covering HTML, CSS, and JavaScript. Students will learn how to create responsive websites and build interactive web applications.</p>
                <p className='course-category'>Course Category: Web Development</p>
                <h3 className='course-lectures-heading'>Lectures:</h3>
                <ul className='course-lectures-list'>
                    <li className='course-lecture-item'>Lecture 1: Introduction to HTML</li>
                    <li className='course-lecture-item'>Lecture 2: Styling with CSS</li>
                    <li className='course-lecture-item'>Lecture 3: JavaScript Basics</li>
                    <li className='course-lecture-item'>Lecture 4: Building a Responsive Website</li>
                    <li className='course-lecture-item'>Lecture 5: Introduction to Web Applications</li>
                </ul>
            </div>
        </div>
    )
}
