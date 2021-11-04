const pagesList = document.getElementById('list');
const pagination = document.getElementById('pagination');

const prevBtn = document.getElementById('prev-btn');
const prevItem = document.getElementById('prev-item');
const nextBtn = document.getElementById('next-btn');
const nextLink = document.getElementById('next-link');

const nextBtnEmpty = document.getElementById('next-btn-fake')

async function getPosts(page) {
  const response = await fetch(`https://gorest.co.in/public-api/posts?page=${page}`)
  const result = await response.json(response);
  return result;
}

async function renderList() {

  // send to getPosts current page number from window location
  // get destructered object of key "data"

  let currentPage = +getCurrentPage() || 1; // returns page or 1 if not true

  const {
    data: currentList
  } = await getPosts(currentPage);

  await currentList.forEach(post => {
    const link = document.createElement('a');
    link.classList.add('list-group-item', 'list-group-item-action');
    link.href = `./pages/post/post.html?id=${post.id}`;
    link.textContent = post.title;

    pagesList.append(link);

  });
}


async function renderPagination(first, last, max) {

  let pageNumber = +getCurrentPage() || 1;

  const {item: firstItem, link: firstLink} = createPagePagItem ();
  const {item: lastItem, link: lastLink} = createPagePagItem ();

  const firstDots = createDotsPag();
  const lastDots = createDotsPag()

  firstLink.textContent = '1';
  lastLink.textContent = max;

  firstLink.href = '?page=1';
  lastLink.href = `?page=${max}`;


  firstItem.append(firstLink);
  lastItem.append(lastLink);

  if (pageNumber >= 4) {
    prevItem.after(firstDots);
    prevItem.after(firstItem);
  }

  if (pageNumber <= max - 4) {
    nextBtn.before(lastDots);
    nextBtn.before(lastItem);
  }


  for (let i = first; i <= last; i++) {

    const {item: numberItem, link: numberLink} = createPagePagItem();


    numberLink.href = `?page=${i}`;
    numberLink.textContent = i;

    pageNumber == i ? numberItem.classList.add('active') : numberItem;


    numberItem.append(numberLink)
    nextBtnEmpty.before(numberItem);

  }

}

function getCurrentPage() {
  const params = new URLSearchParams(window.location.search);
  const pageId = params.get('page');
  return pageId;
}


async function createPageList () {

  let pageNumber = +getCurrentPage() || 1;

  const {
    meta: totalPages
  } = await getPosts(pageNumber);

  const maxPage = totalPages.pagination.pages;
  const minPage = 1;

  let lastNumber;

  let firstNumber = pageNumber >=3 ? pageNumber - 2 : minPage;
  pageNumber <= 3 ? lastNumber = 5 : lastNumber = pageNumber + 2;

  pageNumber >= maxPage - 2 || pageNumber === maxPage ? lastNumber = maxPage : lastNumber;

  prevBtn.href = `?page=${pageNumber - 1}`;
  nextLink.href = `?page=${pageNumber + 1}`;
  pageNumber === minPage ? prevBtn.parentElement.classList.add('disabled') : prevBtn.parentElement.classList.remove('disabled');
  pageNumber === maxPage ? nextLink.parentElement.classList.add('disabled') : nextLink.parentElement.classList.remove('disabled');


  renderPagination(firstNumber, lastNumber, maxPage);

}

function createPagePagItem() {
  const item = document.createElement('li');
  const link = document.createElement('a');

  item.classList.add('page-item');
  link.classList.add('page-link');

  return {
    item,
    link
  }
}

function createDotsPag() {

  const {item: dotsItem, link: dotsLink} = createPagePagItem ();
  dotsLink.textContent = '...';
  dotsItem.classList.add('disabled');

  dotsItem.append(dotsLink);

  return dotsItem;
}

renderList();
createPageList();


