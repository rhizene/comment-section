import { useAppDispatch } from 'app/hooks';
import { Comment } from 'features/comment/Comment';
import { fetchUser } from 'features/user/userSlice';
import './App.css';

function App() {
  const dispatch = useAppDispatch();
  const fetchCurrentUser = ()=>dispatch(fetchUser());

  fetchCurrentUser()

  return (
      <Comment></Comment>
  );
}

export default App;
