import './index.css';
export function Createcourse() {
    return (
        <div className='create-course'>
            <h1 className='create-course-heading'>Create Course</h1> 
            <form className='create-course-form'>
                <label htmlFor="course-name">Course Name:</label>
                <input type="text" id="course-name" name="course-name" required /> 
                <label htmlFor="course-description">Course Description:</label>
                <textarea id="course-description" name="course-description" required></textarea>
                <label htmlFor="course-category">Course Category:</label>
                <input type="text" id="course-category" name="course-category" required />
                <button type="submit" className='create-course-button'>Create Course</button>
            </form>
        </div>
    )
}
