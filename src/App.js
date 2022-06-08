import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import {Candidates,LongIn,SignUp,AddCandidate,EditCandidate} from './pages'
import ProtectedRoute from './helper/ProtectedRoute';
import useAuth from './hooks/userAuth'
function App() {
  const {userAuth} = useAuth()
  return (
    <Router>
      <Routes>
        <Route path='/' element={<ProtectedRoute user={userAuth}/>}>
          <Route path='/' element={<Candidates/>}/>
        </Route>
        <Route path='/add-candidate/:currentUserId' element={<AddCandidate/>}/>
        <Route path='/edit-candidate/:candDocId' element={<EditCandidate/>}/>
        <Route path='/login' element={<LongIn/>}/>
        <Route path='/signup' element={<SignUp/>}/>
      </Routes>
    </Router>
  );
}

export default App;
