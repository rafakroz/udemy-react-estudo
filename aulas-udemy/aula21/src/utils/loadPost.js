export const loadPosts = async () => {
    //Faz uma requisição para a API de posts
    const postsResponse  = fetch('https://jsonplaceholder.typicode.com/posts');

    const photosResponse = fetch('https://jsonplaceholder.typicode.com/photos');
    
    // Aguarda a resolução das promessas
    const [posts, photos] = await Promise.all([postsResponse, photosResponse]);

    //Convertendo para Json
    const postJson   = await posts.json();
    const photosJson = await photos.json();

    const postsAndPhotos = postJson.map((post, index) => {
        return { ...post, cover: photosJson[index].url }
    });

    return postsAndPhotos;
}

//Como a função não é uma função construtora, não um componente, nem uma classe, começa com caixa baixa.
//É assincrona, pois é usado await dentro dela