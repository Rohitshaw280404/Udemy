import './index.css'

export function Addlecture() {
    return (
        <div className='add-lecture'>
            <h1 className='add-lecture-heading'>Add Lecture</h1>
            <form className='add-lecture-form'>
                <label htmlFor="course-name">Course Name:</label>
                <input type="text" id="course-name" name="course-name" required /> 
                <label htmlFor="lecture-title">Lecture Title:</label>
                <input type="text" id="lecture-title" name="lecture-title" required />
                <label htmlFor="lecture-description">Lecture Description:</label>
                <textarea id="lecture-description" name="lecture-description" required></textarea>
                <label htmlFor="lecture-video">Lecture Video URL:</label>
                <input type="url" id="lecture-video" name="lecture-video" required />
                <button type="submit" className='add-lecture-button'>Add Lecture</button>
            </form>
        </div>
    )
}
