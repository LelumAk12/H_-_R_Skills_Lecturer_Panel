import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusIcon, XIcon, TrashIcon, CalendarIcon } from 'lucide-react';
import { Footer } from '../components/Footer';
import '../styles/CreateQuizPage.css';
interface Answer {
  text: string;
}
interface Question {
  text: string;
  answers: Answer[];
  points: number;
}
export function CreateQuizPage() {
  const navigate = useNavigate();
  const [quizInfo, setQuizInfo] = useState({
    title: '',
    description: '',
    dueDate: ''
  });
  const [questions, setQuestions] = useState<Question[]>([{
    text: '',
    answers: [{
      text: ''
    }, {
      text: ''
    }, {
      text: ''
    }],
    points: 10
  }]);
  const handleQuizInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setQuizInfo({
      ...quizInfo,
      [e.target.name]: e.target.value
    });
  };
  const handleQuestionChange = (index: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[index].text = value;
    setQuestions(newQuestions);
  };
  const handleAnswerChange = (qIndex: number, aIndex: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].answers[aIndex].text = value;
    setQuestions(newQuestions);
  };
  const addAnswer = (qIndex: number) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].answers.push({
      text: ''
    });
    setQuestions(newQuestions);
  };
  const removeAnswer = (qIndex: number, aIndex: number) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].answers.splice(aIndex, 1);
    setQuestions(newQuestions);
  };
  const addQuestion = () => {
    setQuestions([...questions, {
      text: '',
      answers: [{
        text: ''
      }, {
        text: ''
      }, {
        text: ''
      }],
      points: 10
    }]);
  };
  const removeQuestion = (index: number) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/lecture/create-course');
  };
  return <div className="create-quiz-page">
      <header className="create-quiz-header">
        <div className="create-quiz-header-logo">
          <img src="/Logo.png" alt="H & R Skills" className="create-quiz-logo" />
        </div>

        <nav className="create-quiz-nav">
          <button onClick={() => navigate('/lecturer/profile')} className="create-quiz-nav-link">
            Home
          </button>
          <button onClick={() => navigate('/lecturer/courses')} className="create-quiz-nav-link">
            My Courses
          </button>
          <button onClick={() => navigate('/lecturer/live-module')} className="create-quiz-nav-link live">
            • Live
          </button>
        </nav>

        <div className="create-quiz-header-actions">
          <button className="create-quiz-header-icon">🔍</button>
          <button className="create-quiz-header-icon">🔔</button>
          <button className="create-quiz-header-icon">👤</button>
        </div>
      </header>

      <div className="create-quiz-content">
        <h1 className="create-quiz-title">Create New Quiz</h1>

        <div className="create-quiz-grid">
          <div className="create-quiz-info-section">
            <h2 className="create-quiz-section-title">Quiz Informtaion</h2>

            <form className="create-quiz-info-form">
              <div className="create-quiz-form-group">
                <label className="create-quiz-label">Title</label>
                <input type="text" name="title" placeholder="Enter Title" value={quizInfo.title} onChange={handleQuizInfoChange} className="create-quiz-input" />
              </div>

              <div className="create-quiz-form-group">
                <label className="create-quiz-label">Description</label>
                <textarea name="description" placeholder="Enter Title" value={quizInfo.description} onChange={handleQuizInfoChange} className="create-quiz-textarea" rows={4} />
              </div>

              <div className="create-quiz-form-group">
                <label className="create-quiz-label">Due Date (Optional)</label>
                <div className="create-quiz-date-wrapper">
                  <input type="text" name="dueDate" placeholder="mm/dd/yy" value={quizInfo.dueDate} onChange={handleQuizInfoChange} className="create-quiz-input" />
                  <CalendarIcon className="create-quiz-calendar-icon" />
                </div>
              </div>
            </form>
          </div>

          <div className="create-quiz-questions-section">
            <h2 className="create-quiz-section-title">Questions</h2>

            <div className="create-quiz-questions-list">
              {questions.map((question, qIndex) => <div key={qIndex} className="create-quiz-question-card">
                  <div className="create-quiz-question-header">
                    <h3 className="create-quiz-question-number">
                      Question {String(qIndex + 1).padStart(2, '0')}
                    </h3>
                    <button onClick={() => removeQuestion(qIndex)} className="create-quiz-delete-btn">
                      <TrashIcon className="create-quiz-delete-icon" />
                    </button>
                  </div>

                  <textarea placeholder="Enter question" value={question.text} onChange={e => handleQuestionChange(qIndex, e.target.value)} className="create-quiz-question-input" rows={3} />

                  <div className="create-quiz-answers">
                    {question.answers.map((answer, aIndex) => <div key={aIndex} className="create-quiz-answer-row">
                        <input type="radio" name={`question-${qIndex}`} className="create-quiz-radio" />
                        <input type="text" placeholder="Answer option" value={answer.text} onChange={e => handleAnswerChange(qIndex, aIndex, e.target.value)} className="create-quiz-answer-input" />
                        <button onClick={() => removeAnswer(qIndex, aIndex)} className="create-quiz-remove-answer">
                          <XIcon className="create-quiz-x-icon" />
                        </button>
                      </div>)}
                  </div>

                  <button onClick={() => addAnswer(qIndex)} className="create-quiz-add-answer">
                    <PlusIcon className="create-quiz-plus-icon" />
                    Add Answer Option
                  </button>

                  <div className="create-quiz-points">
                    <label className="create-quiz-points-label">Point</label>
                    <input type="number" value={question.points} onChange={e => {
                  const newQuestions = [...questions];
                  newQuestions[qIndex].points = parseInt(e.target.value) || 0;
                  setQuestions(newQuestions);
                }} className="create-quiz-points-input" />
                  </div>
                </div>)}
            </div>

            <button onClick={addQuestion} className="create-quiz-add-question">
              <PlusIcon className="create-quiz-plus-icon" />
              Add New Question
            </button>

            <div className="create-quiz-actions">
              <button onClick={() => navigate('/lecturer/create-course')} className="create-quiz-btn draft">
                Save Draft
              </button>
              <button onClick={handleSubmit} className="create-quiz-btn submit">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>;
}