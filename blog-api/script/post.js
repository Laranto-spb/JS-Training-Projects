const postTitle = document.getElementById('post-title');
const postContent = document.getElementById('post-content');
const commentList = document.getElementById('comment-list');
const id = getPageId();

function getPageId () {
  const pageInfo = new URLSearchParams(window.location.search)
  const pageId = pageInfo.get('id');
  return pageId;
}

async function getPosts () {
  const response = await fetch(`https://gorest.co.in/public-api/posts/${id}`);
  const result = await response.json(response);
  return result;
}

async function getComments () {
  const response = await fetch(`https://gorest.co.in/public-api/comments?post_id=${id}`);
  const result = await response.json(response);
  return result;
}


async function renderPost () {
  const postData = await getPosts();
  const commentData = await getComments();
  postTitle.textContent = postData.data.title;
  postContent.textContent = postData.data.body;

  if (commentData.data.length > 0) {
    commentData.data.forEach(el => {
      const authorBox = document.createElement('div');
      const item = document.createElement('li');
      const authorName = document.createElement('span');
      const commnentBody = document.createElement('p');
      const avatar = document.createElement('img');

      avatar.src = 'https://random.imagecdn.app/30/30';


      authorBox.classList.add('author-wrap', 'mb-2')
      item.classList.add('list-group-item');
      authorName.classList.add('fs-4', 'fw-bold')
      avatar.classList.add('avatar', 'me-3')

      authorName.textContent = el.name;
      commnentBody.textContent = el.body;

      authorBox.append(avatar);
      authorBox.append(authorName);
      item.append(authorBox);
      item.append(commnentBody);
      commentList.append(item);
    });
  } else {
    const emptyBox = document.createElement('p');

    emptyBox.textContent = 'No comments yet...';

    emptyBox.classList.add('text-secondary');

    commentList.append(emptyBox);

  }

}

renderPost();




