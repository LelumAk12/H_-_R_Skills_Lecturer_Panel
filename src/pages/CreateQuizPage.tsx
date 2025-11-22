import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { useApp } from '../context/AppContext';
import { PlusIcon, TrashIcon } from 'lucide-react';
import { toast } from 'sonner';
import '../styles/CreateQuizPage.css';
interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}
export function CreateQuizPage() {
  const navigate = useNavigate();
  const {
    user
  } = useApp();
  const [quizTitle, setQuizTitle] = useState('');
  const [questions, setQuestions] = useState<Question[]>([{
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0
  }]);
  const handleAddQuestion = () => {
    setQuestions([...questions, {
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0
    }]);
  };
  const handleRemoveQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };
  const handleQuestionChange = (index: number, value: string) => {
    const updated = [...questions];
    updated[index].question = value;
    setQuestions(updated);
  };
  const handleOptionChange = (qIndex: number, oIndex: number, value: string) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex] = value;
    setQuestions(updated);
  };
  const handleCorrectAnswerChange = (qIndex: number, oIndex: number) => {
    const updated = [...questions];
    updated[qIndex].correctAnswer = oIndex;
    setQuestions(updated);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quizTitle) {
      toast.error('Please enter a quiz title');
      return;
    }
    toast.success('Quiz created successfully!');
    navigate('/lecturer/courses');
  };
  return <div className="create-quiz-page">
      <Sidebar userName={user.name} userEmail={user.email} userImage={user.image} />
      <div className="create-quiz-main">
        <Header />
        <div className="create-quiz-content">
          <h1 className="create-quiz-title">Create Quiz</h1>
          <div className="create-quiz-section">
            <form onSubmit={handleSubmit} className="create-quiz-form">
              <div className="create-quiz-form-group">
                <label className="create-quiz-label">Quiz Title</label>
                <input type="text" placeholder="Enter quiz title" value={quizTitle} onChange={e => setQuizTitle(e.target.value)} className="create-quiz-input" required />
              </div>
              {questions.map((q, qIndex) => <div key={qIndex} className="create-quiz-question-block">
                  <div className="create-quiz-question-header">
                    <h3 className="create-quiz-question-number">
                      Question {qIndex + 1}
                    </h3>
                    {questions.length > 1 && <button type="button" onClick={() => handleRemoveQuestion(qIndex)} className="create-quiz-remove-btn">
                        <TrashIcon className="create-quiz-icon" />
                      </button>}
                  </div>
                  <div className="create-quiz-form-group">
                    <input type="text" placeholder="Enter your question" value={q.question} onChange={e => handleQuestionChange(qIndex, e.target.value)} className="create-quiz-input" required />
                  </div>
                  <div className="create-quiz-options">
                    {q.options.map((option, oIndex) => <div key={oIndex} className="create-quiz-option">
                        <input type="radio" name={`correct-${qIndex}`} checked={q.correctAnswer === oIndex} onChange={() => handleCorrectAnswerChange(qIndex, oIndex)} className="create-quiz-radio" />
                        <input type="text" placeholder={`Option ${oIndex + 1}`} value={option} onChange={e => handleOptionChange(qIndex, oIndex, e.target.value)} className="create-quiz-input" required />
                      </div>)}
                  </div>
                </div>)}
              <button type="button" onClick={handleAddQuestion} className="create-quiz-add-btn">
                <PlusIcon className="create-quiz-icon" />
                Add Question
              </button>
              <div className="create-quiz-actions">
                <button type="button" onClick={() => navigate('/lecturer/courses')} className="create-quiz-btn cancel">
                  Cancel
                </button>
                <button type="submit" className="create-quiz-btn save">
                  Create Quiz
                </button>
              </div>
            </form>
          </div>
        </div>
        
      </div>
    </div>;
}