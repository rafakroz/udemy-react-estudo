import P from 'prop-types';
import './App.css';
import { useEffect, useState, useMemo } from 'react';

/* O useCallback e useMemo tem praticamente o mesmo objetivo,
no entanto, o React.memo (useMemo é a mesma coisa), guarda um componente,
guarda valores */

//Componente do post
const Post = ({ post }) => {
  console.log('Filho renderizou');
  return (
    <div key={post.id} className="post">
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </div>
  );
};

//Tipando
Post.propTypes = {
  post: P.shape({
    id: P.number,
    title: P.string,
    body: P.string,
  }),
};

function App() {
  const [posts, setPosts] = useState([]);
  const [value, setValue] = useState('');

  console.log('Pai renderizou');

  //simulando componentdidMount
  useEffect(() => {
    setTimeout(function () {
      fetch('https://jsonplaceholder.typicode.com/posts')
        //Convertendo para json
        .then((r) => r.json())
        //Pegando a resposta r e jogandop em SetPoasts
        .then((r) => setPosts(r));
    }, 4000);
  }, []);

  return (
    <div className="App">
      <p>
        <input
          type="search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </p>
      {/* useMemo para não renderizar os posts novamente */}
      {useMemo(() => {
        return (
          posts.length > 0 &&
          posts.map((post) => {
            return <Post key={post.id} post={post} />;
          })
        );
      }, [posts])}
      {posts.length <= 0 && <p>Ainda não existem posts</p>}
    </div>
  );
}

export default App;
