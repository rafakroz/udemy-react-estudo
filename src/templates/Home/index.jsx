// import logo from './logo.svg';
import React from 'react';

import { useEffect, useState, useCallback } from 'react';

import './styles.css';

import { Posts } from '../../components/Posts';
import { loadPosts } from '../../utils/load-post';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

export const Home = () => {
  //

  // #region Config States

  //Configurando o estado/state
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPost] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState('');

  const noMorePosts = page + postsPerPage >= allPosts.length;

  // #region filteredPosts

  //Posts filtrados
  const filteredPosts = searchValue
    ? allPosts.filter((post) => {
        return post.title.toLowerCase().includes(searchValue.toLowerCase());
      })
    : posts;

  // #region handleLoadPosts

  // #region Carregando os posts
  const handleLoadPosts = useCallback(async (page, postsPerPage) => {
    //
    const postsAndPhotos = await loadPosts();

    setPosts(postsAndPhotos.slice(page, postsPerPage)); //posts na página
    setAllPost(postsAndPhotos);
  }, []);

  // #region useEffect

  useEffect(() => {
    handleLoadPosts(0, postsPerPage);
  }, [handleLoadPosts, postsPerPage]);

  // #region loadMorePosts

  // Carregar mais posts
  const loadMorePosts = () => {
    //
    const nextPage = page + postsPerPage;

    //Próxima fatia de posts a serem acrescidos na página
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);

    //Spread operator vai expalhar os post ao invés de colocar outros arrays
    posts.push(...nextPosts);

    //Alterando o state com os posts e a página com o novo valor
    setPosts(posts);
    setPage(nextPage);
  };

  // #region handleChange

  // Monitora a mudança de valor no input
  const handleChange = (e) => {
    //
    const { value } = e.target;

    setSearchValue(value);
  };

  // #region return

  return (
    //Componente
    <section className="container">
      <div className="search-container">
        {/* Se houver valor na busca o input é exibido */}
        {!!searchValue && (
          <h2>
            Search value: &quot;{searchValue}&quot; ({filteredPosts.length}{' '}
            result
            {filteredPosts.length === 1 ? '' : 's'})
          </h2>
        )}

        <TextInput searchValue={searchValue} handleChange={handleChange} />
      </div>

      {filteredPosts.length > 0 && <Posts posts={filteredPosts} />}

      {filteredPosts.length === 0 && <p>Não existem posts!</p>}

      <div className="button-container">
        {/* Se não houver valor buscado, o button aparece */}
        {!searchValue && (
          <Button
            text="Load more posts"
            onClick={loadMorePosts}
            disabled={noMorePosts}
          />
        )}
      </div>
    </section>
  );
};
