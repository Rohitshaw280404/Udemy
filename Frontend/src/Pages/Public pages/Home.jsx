import './index.css';

export function Seestudent() {
    return (

        <div className='see-student'>
            <h1 className='see-student-heading'>See Student</h1>
            <table className='see-student-table'>

                <thead>
                    <tr>
                        <th>Student Name</th>
                        <th>Email</th>
                        <th>Enrolled Course</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>

                        <td>John Doe</td>
                        <td>john.doe@example.com</td>
                        <td>Introduction to Web Development</td>
                    </tr>
                    <tr>
                        <td>Jane Smith</td>
                        <td>jane.smith@example.com</td>
                        <td>Advanced JavaScript</td>
                    </tr>
                    <tr>
                        <td>Michael Johnson</td>
                        <td>michael.johnson@example.com</td>
                        <td>React Fundamentals</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
