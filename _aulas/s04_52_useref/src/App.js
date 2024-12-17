import P from 'prop-types';
import './App.css';
import { useEffect, useState, useMemo, useRef } from 'react';

/* O useCallback e useMemo tem praticamente o mesmo objetivo,
no entanto, o React.memo (useMemo é a mesma coisa), guarda um componente,
guarda valores */

//Componente do post
const Post = ({ post, handleClick }) => {
  console.log('Filho renderizou');
  return (
    <div key={post.id} className="post">
      <h2 style={{color: 'firebrick'}} onClick={() => handleClick(post.title)}>{post.title}</h2>
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
  handleClick: P.func,
};

function App() {
  const [posts, setPosts] = useState([]);
  const [value, setValue] = useState('');

  //Criando a referência com o useRef
  const input = useRef(null);

  const contador = useRef(0);

  console.log('Pai renderizou');

  //simulando componentdidMount
  useEffect(() => {
      fetch('https://jsonplaceholder.typicode.com/posts')
        //Convertendo para json
        .then((r) => r.json())
        //Pegando a resposta r e jogandop em SetPoasts
        .then((r) => setPosts(r));
  }, []);

  useEffect(() => {
    input.current.focus();
    console.log(input.current);
  }, [value]);

  useEffect(() => {
    contador.current++;
  });

  const handleClick = (value) => {
    setValue(value);
  }

  return (
    <div className="App">
      <h1>useRef</h1>
      <h3>Renderizou: {contador.current}x</h3>
      <p>
        <input
          ref={input}
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
            return <Post key={post.id} post={post} handleClick={ handleClick } />;
          })
        );
      }, [posts])}
      {posts.length <= 0 && <p>Ainda não existem posts</p>}
    </div>
  );
}

export default App;
