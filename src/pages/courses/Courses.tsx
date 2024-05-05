import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./courses.scss";
import { ClassNames } from '@emotion/react';

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newCourseTitle, setNewCourseTitle] = useState('');
  const [newCourseDescription, setNewCourseDescription] = useState('');
  const history = useNavigate();

  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.get('https://gp-ooo8.onrender.com/courses', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setCourses(response.data.courses);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  

  useEffect(() => {
    fetchCourses();}, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddCourseClick = () => {
    setShowAddForm(!showAddForm);
  };

  const handleSubmitCourse = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('https://gp-ooo8.onrender.com/courses', {
        title: newCourseTitle,
        description: newCourseDescription
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setNewCourseTitle('');
      setNewCourseDescription('');
      setShowAddForm(false);
      fetchCourses();
    } catch (error) {
      console.error('Failed to add course', error);
    }
  };

  const navigateToCoursePage = (courseId) => {
    history(`/courses/${courseId}`);
  };

  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading courses: {error.message}</div>;

  return (
    <div className="courses-container">
      <div className="courses-header">
        <h1 className="courses-title">List of Courses</h1>
        <div className="courses-toolbar">
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button className="search-btn">Search</button>
          </div>
          <button className="add-btn" onClick={handleAddCourseClick}>+</button>
        </div>
      </div>
      {showAddForm && (
        
        <form  onSubmit={handleSubmitCourse} className="add-course-form">
              <input 
                type="text"
                placeholder="Course Title"
                value={newCourseTitle}
                onChange={(e) => setNewCourseTitle(e.target.value)}
                className="add-course-form" // Add the class add-course-form
              />

          <textarea 
            placeholder="Course Description"
            value={newCourseDescription}
            onChange={(e) => setNewCourseDescription(e.target.value)}
            className="add-course-form"
          />
          <button type="submit" className="add-course-form" >Add Course</button>
        </form>
      )}
      <div className="courses-table-container">
        <table className="courses-table">
          <thead>
            <tr>
              {/* <th>ID</th> */}
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {courses.filter(course => course.title.toLowerCase().includes(searchTerm.toLowerCase())).map((course) => (
              <tr key={course.title} onClick={() => navigateToCoursePage(course._id)} style={{cursor: 'pointer'}}>
                {/* <td>{course._id}</td> */}
                <td>{course.title}</td>
                <td>{course.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Courses;
