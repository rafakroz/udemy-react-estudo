import { PostsProvider } from '../../contexts/PostsProvider';
import { Posts } from '../../components/Posts';
import './styles.css';

function App() {
  /* Todos os filhos de App, podem usar o contexto PostsProvaider */

  return (
    <PostsProvider>
      <div>
        <Posts />
      </div>
    </PostsProvider>
  );
}

export default App;
