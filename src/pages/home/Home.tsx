import React from 'react';
import './home.scss'; // Make sure the path to your SCSS file is correct

const HomeDashboard = () => {
  // Example data representing counts of various educational content. Replace with real data as needed.
  const contentStats = [
    { label: "Courses", value: "120" },
    { label: "Quizzes", value: "300" },
    { label: "Summaries", value: "200" },
    { label: "Flashcards", value: "500" },
  ];
  // Placeholder data for demonstration purposes
  const recentActivities = [
    { activity: "Completed the course 'Introduction to Python'", timestamp: "2 hours ago" },
    { activity: "Scored 95% on 'Advanced Mathematics Quiz'", timestamp: "1 day ago" },
    { activity: "Started a new course 'Data Structures and Algorithms'", timestamp: "3 days ago" },
  ];

  const topRatedCourses = [
    { title: "Advanced JavaScript", rating: "4.9", students: "1500" },
    { title: "Machine Learning Basics", rating: "4.8", students: "1200" },
    { title: "Introduction to Databases", rating: "4.7", students: "1800" },
  ];

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <div className="dashboard-container">
      <div className="content-stats">
        {contentStats.map((stat) => (
          <div className="stat-item" key={stat.label}>
            <h2>{stat.value}</h2>
            <p>{stat.label}</p>
          </div>
        ))} 
      </div>
      <div className="recent-activities">
        <h2>Recent Activities</h2>
        <ul>
          {recentActivities.map((activity, index) => (
            <li key={index}>{activity.activity} - <span>{activity.timestamp}</span></li>
          ))}
        </ul>
      </div>
      <div className="top-rated-courses">
        <h2>Top-Rated Courses</h2>
        <div className="courses-list">
          {topRatedCourses.map((course, index) => (
            <div key={index} className="course-item">
              <h3>{course.title}</h3>
              <p>Rating: {course.rating} stars</p>
              <p>Students: {course.students}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>  
  );
};

export default HomeDashboard;
