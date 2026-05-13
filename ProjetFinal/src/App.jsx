import './App.css'
import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateArticle from './pages/CreateArticle';
import MyArticles from './pages/MyArticles';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import ArticleDetail from './pages/ArticleDetail';
import EditArticle from './pages/EditArticle';



function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/*Routes Publiques*/}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/article/:id" element={<ArticleDetail />} />
        
        
        {/*Routes Privées*/}
        <Route path="/create-article" element={
          <ProtectedRoute>
            <CreateArticle />
          </ProtectedRoute>
        } />
        <Route path="/my-articles" element={
          <ProtectedRoute>
            <MyArticles />
          </ProtectedRoute>
        } />
        <Route path="/edit/:id" element={
          <ProtectedRoute>
            <EditArticle />
          </ProtectedRoute>
        } />

        {/*Route 404*/}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  ) 
}

export default App
