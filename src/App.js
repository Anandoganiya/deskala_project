import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import {Candidates,LongIn,SignUp,AddCandidate} from './pages'
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Candidates/>}/>
        <Route path='/add-candidate' element={<AddCandidate/>}/>
        <Route path='/login' element={<LongIn/>}/>
        <Route path='/signup' element={<SignUp/>}/>
      </Routes>
    </Router>
  );
}

export default App;
