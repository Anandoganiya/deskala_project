import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import {Candidates,LongIn,SignUp,AddCandidate,EditCandidate} from './pages'
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Candidates/>}/>
        <Route path='/add-candidate/:currentUserId' element={<AddCandidate/>}/>
        <Route path='/edit-candidate/:candDocId' element={<EditCandidate/>}/>
        <Route path='/login' element={<LongIn/>}/>
        <Route path='/signup' element={<SignUp/>}/>
      </Routes>
    </Router>
  );
}

export default App;
