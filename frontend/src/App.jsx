import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import FormPage from './components/Form/Form'
import List from './components/List/List'
import AdPage from './components/AdPage/AdPage';

const App = () => {


  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/list" replace />} />
          <Route path="/list" element={<List/>}/>
          <Route path="/list/:PageId" element={<AdPage />} />
          <Route path="/form" element={<FormPage/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
