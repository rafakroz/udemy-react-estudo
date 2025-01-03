import * as types from './types';

/* As actions serão funções, toda vez que uma ação tiver que ser
realizada, uma action será chamada.

Se houverem muitas actions, pode ser interesante separá-las por arquivos. */

export const loadPosts = async (dispatch) => {
  //
  dispatch({ type: types.POSTS_LOADING });

  // esperando a requisição
  const postsRaw = await fetch('https://jsonplaceholder.typicode.com/posts');

  // esperando a conversão para json
  const posts = await postsRaw.json();

  console.log('Carreguei os POSTS');

  // E a ação é disparada
  dispatch({ type: types.POSTS_SUCCESS , payload: posts });
  // return () => dispatch(
  //   { type: types.POSTS_SUCCESS , payload: posts });
}
