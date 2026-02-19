import './index.css'
export function Mycourse() {
    return (

        <div className='my-course'>
            <h1 className='my-course-heading'>My Courses</h1>
            <table className='my-course-table'>
                <thead> 
                    <tr>

                        <th>Course Name</th>
                        <th>Instructor</th>
                        <th>Progress</th>
                    </tr>
                </thead>
                <tbody>

                    <tr>
                        <td>Introduction to Web Development</td>
                        <td>John Doe</td>
                        <td>50%</td>
                    </tr>
                    <tr>

                        <td>Advanced JavaScript</td>
                        <td>Jane Smith</td>

                        <td>30%</td>
                    </tr>
                    <tr>
                        <td>React Fundamentals</td>
                        <td>Michael Johnson</td>

                        <td>70%</td>
                    </tr>
                </tbody>
            </table>
        </div>




    )

}
