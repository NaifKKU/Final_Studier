import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "./democourse.scss";
import { FlashcardArray } from "react-quizlet-flashcard";
import { colors } from '@mui/material';
import { GiWhiteBook } from 'react-icons/gi';

const DemoCourse = () => {
  const { id } = useParams();
  const [selectedChapterId, setSelectedChapterId] = useState('');
  const [chaptersData, setChaptersData] = useState([]);
  const [summariesData, setSummariesData] = useState([]);
  const [flashcardsData, setFlashcardsData] = useState([]);
  const [searchTermChapters, setSearchTermChapters] = useState('');
  const [searchTermSummaries, setSearchTermSummaries] = useState('');
  const [searchTermFlashcards, setSearchTermFlashcards] = useState('');
  const [showAddFormChapters, setShowAddFormChapters] = useState(false);
  const [showAddFormFlashcards, setShowAddFormFlashcards] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [file, setFile] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState('');


  const ChapterDropdown = ({ chaptersData, onSelectChapter }) => {
    // console.log(chaptersData);
    
    return (
      <select onChange={(e) => onSelectChapter(e.target.value)}>
        <option value="">Select a chapter</option>
        {chaptersData.map((chapter) => (
          <option key={chapter._id} value={chapter._id}>{chapter.title}</option>
        ))}
      </select>
    );
  }


  const fetchCourseData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.get(`https://gp-ooo8.onrender.com/courses/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const { chapters, summary, flashCards } = response.data.course;

      setChaptersData(chapters);
      //console.log(summary);
      setSummariesData(summary);
      // console.log([flashCards[0].flashcards][0]);
      setFlashcardsData(transformFlashcards([flashCards[0].flashcards][0]));
    } catch (error) {
      console.error('Failed to fetch course data:', error);
    }
  };


  useEffect(() => {
    

    fetchCourseData();
  }, [id]);

  const transformFlashcards = (flashcards: any[]) => {

    return flashcards.map((card) => {
      //console.log('Transforming card:', card.question);
      return {
        id: card._id,
        frontHTML: card.question,
        backHTML: card.answer,

      };
    });
  };
  const handleChapterSelect = (chapterId) => {
    setSelectedChapterId(chapterId);
  };

  const handleSubmitSummaryAndFlashCard = async (e, type, chapterId) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    // console.log(token);
  
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
  
    try {
      let responseUpload;
      if (type === 'Summary') {
        responseUpload = await axios.post(`https://gp-ooo8.onrender.com/chapters/${id}/${chapterId}/summary`, {}, config);
      } else if (type === 'Flashcard') {
        // axios.delete(`https://gp-ooo8.onrender.com/chapters/${id}/${chapterId}/flashcard`, config);
        responseUpload = await axios.post(`https://gp-ooo8.onrender.com/chapters/${id}/${chapterId}/flashcard`, {}, config);
      }
  
      // Assuming you want to reset the form and hide it on successful upload:
      setFormTitle('');
      setFile(null);
      setShowAddFormChapters(false);
      fetchCourseData();
      
    } catch (error) {
      console.error('Failed to upload file:', error);
      // Handle error case, possibly resetting form or providing user feedback
    }
  };
  


  const handleSubmit = async (e, type) => {
    e.preventDefault();
    const formData = new FormData();
    const token = localStorage.getItem('token');
    
    formData.append('title', formTitle);
    if (file) formData.append('pdf', file);

    try {
      const responseUpload = await axios.post(`https://gp-ooo8.onrender.com/chapters/${id}`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      const { uploadedFileName } = responseUpload.data;

      setUploadedFileName(uploadedFileName);
    } catch (error) {
      console.error('Failed to upload file:', error);
    }

    setFormTitle('');
    setFile(null);
    setShowAddFormChapters(false);
    fetchCourseData();
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setSelectedFileName(selectedFile ? selectedFile.name : '');
  };

  return (
    <div className="courses-container">
      <h1 className="courses-title">Demo Course Page</h1>
      <div className="courses-header">
        <h2>Chapters</h2>
        <div className="courses-toolbar">
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search chapters..."
              value={searchTermChapters}
              onChange={(e) => setSearchTermChapters(e.target.value)}
            />
            <button className="search-btn">Search</button>
          </div>
          <button className="add-btn" onClick={() => setShowAddFormChapters(!showAddFormChapters)}>Add Chapter</button>
        </div>
      </div>
      {showAddFormChapters && (
        <div className="add-course-form">
          <form onSubmit={(e) => handleSubmit(e, 'Chapter')}>
            <div className="form-field">
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="file">Chapter PDF File:</label>
              <input
                type="file"
                id="file"
                onChange={handleFileChange}
                required
              />
              <p>{selectedFileName}</p>
            </div>
            <button type="submit">Add Chapter</button>
          </form>
        </div>
      )}
      <div className="courses-table-container">
        <table className="courses-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Content</th>
            </tr>
          </thead>
          <tbody>
            {chaptersData.filter(chapter => chapter.title.toLowerCase().includes(searchTermChapters.toLowerCase())).map((chapter) => (
              <tr key={chapter._id}>
                <td>{chapter.title}</td>
                <td>{chapter.content.split(' ').slice(0, 5).join(' ') + (chapter.content.split(' ').length > 100 ? '...' : '')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>



      <div className="courses-header">
        <h2>Summary</h2>
        <div className="courses-toolbar">
          <button className="add-btn" onClick={() => setShowAddFormChapters(!showAddFormChapters)}>Create New</button>
        </div>
      </div>

      {showAddFormChapters && (
        <div className="add-course-form">
          <form onSubmit={(e) => handleSubmitSummaryAndFlashCard(e, 'Summary', selectedChapterId)}>
            <div className="form-field">
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}

                required
              />
            </div>
            <div className="form-field">
              <ChapterDropdown
                chaptersData={chaptersData}
                
                onSelectChapter={(chapterId) => {
  
                  
                  setSelectedChapterId(chapterId);

                }
                
                }
              />
              <button type="submit">Create Summary</button>
            </div>
          </form>
        </div>


      )}
      <div className="courses-table-container">
        <table className="courses-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Content</th>
            </tr>
          </thead>
          <tbody>
            {summariesData.map((summary) => (
              <tr key={summary.id}>
                {/* <td>{summary.id}</td> */}
                <td>{summary.title}</td>
                <td>{summary.summary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>



      <div className="courses-header">
        <h2>Flashcard</h2>
        <div className="courses-toolbar">
          <button className="add-btn" onClick={() => setShowAddFormFlashcards(!showAddFormFlashcards)}>Create New</button>
        </div>
      </div>
      {showAddFormFlashcards && (
        <div className="add-course-form">
          <form onSubmit={(e) => handleSubmitSummaryAndFlashCard(e, 'Flashcard', selectedChapterId)}>
          <div className="form-field">
            <ChapterDropdown
              chaptersData={chaptersData}
              onSelectChapter={(chapterId) => {
                setSelectedChapterId(chapterId);
              }}
            />
            <button type="submit">Create FlashCard</button>
          </div>
          </form>
        </div>
      )}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="flashcard-section">
          <FlashcardArray cards={flashcardsData}

            backContentStyle={{
              backgroundColor: "green",
              color: "white",
              padding: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            frontContentStyle={{
              backgroundColor: "#222b3c",
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "10px",
              fontSize: "20px"
            }}
          />
        </div>
      </div>
    </div>

  );
};

export default DemoCourse;
