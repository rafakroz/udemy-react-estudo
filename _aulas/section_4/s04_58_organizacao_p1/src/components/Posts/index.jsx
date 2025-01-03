/* Não é passada props, pois será usado o contexto. */

import { useContext, useEffect, useRef } from 'react';
import { PostsContext } from '../../contexts/PostsProvider/context';
import { loadPosts } from '../../contexts/PostsProvider/actions';

export const Posts = () => {
  // Entrou no componente, isMounted é configurado como true
  const isMounted = useRef(true);

  // PostsContext está no arquivo context.js
  const postsContext = useContext(PostsContext);
  //
  const { postsState, postsDispatch } = postsContext;

  console.log(isMounted.current);

  /*  */
  useEffect(() => {
    loadPosts(postsDispatch).then((dispatch) => {
      // O useEffect, verifica se isMounted é true, para disparar a ação
      if (isMounted.current) {
        dispatch();
      }
    });

    return () => {
      isMounted.current = false;
      console.log(isMounted.current);
    };
  }, [postsDispatch]);

  return (
    <div>
      <h1>Componente Posts</h1>
      <h2>Organização com useEffect, useReducer, useContext e useRef</h2>

      {postsState.loading && (
        <p>
          <strong>Carregando posts...</strong>
        </p>
      )}

      {postsState.posts.map((post) => (
        <p key={post.id}>{post.title}</p>
      ))}
    </div>
  );
};
