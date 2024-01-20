import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';

import Layout from "./Layout";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { UserContextProvider } from "./UserContext";
import CreatePost from "./pages/CreatePost";
import PostPage from "./pages/PostPage";
import EditPost from "./pages/EditPost";

import {Route,Routes} from 'react-router-dom'

function App() {
  return (
    <>
 
    <UserContextProvider>
      <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage/>} />
        <Route path="/login" element={
        <LoginPage/>} />
        <Route path="/register" element={
          <RegisterPage/>
        }></Route>
        <Route path="/create" element={
          <CreatePost/>
        }></Route>
        <Route path="/post/:id" element={
         <PostPage/>
        }></Route>
        <Route path="/edit/:id" element={
         <EditPost/>
        }></Route>
      </Route>
    </Routes>

     


    </UserContextProvider>
      
    </>
  );
}

export default App;
