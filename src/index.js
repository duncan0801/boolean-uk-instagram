/*

SERVER: npx json-server --watch db/db.json --routes db/routes.json --static .

Description
In this exercise we explore a multi-user experience most commonly found on social media apps like Instagram, where users can see and interact with other users.

In the template folder you will find examples of the HTML that you can use as a reference to build the exercise, the classes are connected to styles/index.css. Start at 1-root.html.


Ignore the preview feature in the example, we've replaced that feature with an adding likes feature instead (this is not shown in any of the templates so you'll have to add the HTML and style it as you see fit).

Deliverables
- A user can select the user they want to post or comment as

top bar - where users can select which user they want to be 

- From the create a post section, a user can:
    - Enter a post's image URL
    - Enter a post's title
    - Enter a post's content
    - Create a post and view it in the feed
- From the feed section, a user can:
    - View a post and the owner of the post
    - View a posts' comments and the owner of the comments
    - Add a comment to a post
  - Add a like to a post


Instructions
- Download the .zip file from https://codesandbox.io/s/js-instagram-exercise-starter-template-6vfoj
- Run your json-server with json-server --watch db/db.json --routes db/routes.json --static .; notice --static . this is an alternative to using Live Server, you'll be able to view your app on http://localhost:3000/
- Create a fetch function to get data
- Create render functions to show data
- Use event listeners and fetch to create and update data on the server

Tips
- In this exercise focus on practicing Javascript and fetch requests, take your time.
- Keep track of the currentUser in a global variable so that you have access to their id in all your functions.
- Think about conditional rendering when creating the preview feature.
*/

/* <div id="root">

    <!-- Go to 2-header-section.html -->
 
  
    <!-- Go to 3-header-section.html -->

</div> */

// firstly we make the above html in js
// link that to id root in the html
// query selector to find it
// then append

function createEl(tag) {
  return document.createElement(tag);
}

////////
const rootEl = document.querySelector("#root");
console.log(rootEl);


//////// header section ////////
function createHeaderSection() {
  const headerEl = createEl("header");
  headerEl.setAttribute("class", "main-header");

  rootEl.append(headerEl);

  return headerEl
}
let headerEl =createHeaderSection()

function creatMainSection() {
  const mainEl = createEl("main");
  mainEl.setAttribute("class", "wrapper");

  rootEl.append(mainEl);

  return mainEl
}
let mainEl = creatMainSection()

function createUserChip(person) {
  const chipEl = createEl("div");
  chipEl.setAttribute("class", "chip");

  const avatarSmallEl = createEl("div");
  avatarSmallEl.setAttribute("class", "avatar-small");

  const imgEl = createEl("img");
  imgEl.setAttribute("src", person.avatar);
  imgEl.setAttribute("alt", person.username);

  const nameEl = createEl("span");
  nameEl.innerText = person.username;

  avatarSmallEl.append(imgEl)
  chipEl.append(avatarSmallEl, nameEl);

  return chipEl
}

function createUserSection(users) {
  const divEl = createEl("div");
  divEl.setAttribute("class", "wrapper");

  for (person of users) {
    createUserChip(person)
    let chipEl = createUserChip(person);
    divEl.append(chipEl)
    headerEl.append(divEl);
  }

  
}

function createPostSection() {
  let createPostSectionEl = createEl("section")
  createPostSectionEl.setAttribute("class", "create-post-section")
  
  mainEl.append(createPostSectionEl)

  return createPostSectionEl
}
let createPostSectionEl = createPostSection()


function createFeedSection() {
  const feedEl = createEl("section");
  feedEl.setAttribute("class", "feed");

  mainEl.append(feedEl);

  return feedEl
}
let feedEl = createFeedSection()

function createCreatePostSection() {
  const formEl = createEl("form");
  formEl.setAttribute("id", "create-post-form");
  formEl.setAttribute("autocomplete", "off");

  const titleEl = createEl("h2");
  titleEl.innerText = "Create A Post";

  const labelForImageEl = createEl("label");
  labelForImageEl.setAttribute("for", "image");
  labelForImageEl.innerText = "Image URL";
  const inputForImageEl = createEl("input");
  inputForImageEl.setAttribute("id", "image");
  inputForImageEl.setAttribute("name", "image");
  inputForImageEl.setAttribute("type", "text");

  const labelForTitleEl = createEl("label");
  labelForTitleEl.setAttribute("for", "title");
  labelForTitleEl.innerText = "Title";
  const inputForTitleEl = createEl("input");
  inputForTitleEl.setAttribute("id", "title");
  inputForTitleEl.setAttribute("name", "title");
  inputForTitleEl.setAttribute("type", "text");

  const labelForTextAreaEl = createEl("label");
  labelForTextAreaEl.setAttribute("for", "content");
  labelForTextAreaEl.innerText = "Content";
  const textAreaEL = createEl("textarea");
  textAreaEL.setAttribute("id", "content");
  textAreaEL.setAttribute("name", "content");
  textAreaEL.setAttribute("rows", "2");
  textAreaEL.setAttribute("columns", "30");

  const actionDivEl = createEl("div");
  actionDivEl.setAttribute("class", "action-btns");

  const previewBtnEl = createEl("button");
  previewBtnEl.innerText = "Preview";
  previewBtnEl.setAttribute("id", "preview-btn");
  previewBtnEl.setAttribute("type", "button");

  const submitBtnEl = createEl("button");
  submitBtnEl.setAttribute("type", "submit");
  submitBtnEl.innerText = "Post";

  actionDivEl.append(previewBtnEl, submitBtnEl);
  formEl.append(
    titleEl,
    labelForImageEl,
    inputForImageEl,
    labelForTitleEl,
    inputForTitleEl,
    labelForTextAreaEl,
    textAreaEL,
    actionDivEl
  );
  console.log(formEl)
  createPostSectionEl.append(formEl)

  return formEl
}
createCreatePostSection()

let users = []
let posts = []

fetch(`http://localhost:3000/users`)
  .then(function (response) {
    console.log(response);
    return response.json();
  })
  .then(function (userData) {
    console.log(userData);
    createUserSection(userData);
    users = userData;

    console.log("this is the user data :", users);
  });

fetch(`http://localhost:3000/posts`)
  .then(function (response) {
    return response.json();
  })
  .then(function (postData) {
    posts = postData
    console.log("this is the posts data :", posts);

    createPostSection(postData);
  });

  for (post of posts) {
    function createFeedPost() {
      const liEl = document.createElement("li");
      liEl.setAttribute("class", "post");
  
      let userChipEl = createUserChip(user)
  
      const postImgDivEl = createEl("div");
      postImgDivEl.setAttribute("class", "post--image");
  
      const postImgEl = createEl("img")
      postImgEl.setAttribute("src", post.image.src)
      postImgEl.setAttribute("alt", post.image.alt)
  
      postImgDivEl.append(postImgEl)
  
      const postContentDivEl = createEl("div")
      postContentDivEl.setAttribute("class", "post--content")
  
      const postContentTitleEl = createEl("h2")
      postContentTitleEl.innerText = post.title
  
      const postContentEl = createEl("p")
      postContentEl.innerText = post.content
  
      postContentDivEl.append(postContentTitleEl,postContentEl )
  
      const postCommentsDivEl = createEl("div")
      postCommentsDivEl.setAttribute("class", "post--comments")
  
      const postCommentsTitleEl = createEl("h3")
      postCommentsTitleEl.innerText = "Comments"
  
      function generateComment() {
        const postCommentDivEl = createEl("div")
        postCommentDivEl.setAttribute("class", "post--comment")
      
        const avatarSmallDivEl = createEl("div")
        avatarSmallDivEl.setAttribute("class", "avatar-small")
  
        const avatarSmallImgEl = createEl("img")
        avatarSmallImgEl.setAttribute("src", user.avatar)
  
        const commentEl = createEl("p")
        commentEl.innerText = post.comments[1].content
  
        avatarSmallDivEl.append(avatarSmallImgEl)
        postCommentDivEl.append(avatarSmallDivEl,commentEl)
  
        return postCommentDivEl
      }
      let postCommentDivEl1 = generateComment()
      console.log("POST COMMENT DIV:", postCommentDivEl1)
      let postCommentDivEl2 = generateComment()
  
      postCommentsDivEl.append(postCommentsTitleEl,postCommentDivEl1,postCommentDivEl2 )
  
      liEl.append(userChipEl, postImgDivEl, postContentDivEl, postCommentsDivEl)
  
      return liEl
    }
  }
  function createFeedPost() {
    const liEl = document.createElement("li");
    liEl.setAttribute("class", "post");

    let userChipEl = createUserChip(user)

    const postImgDivEl = createEl("div");
    postImgDivEl.setAttribute("class", "post--image");

    const postImgEl = createEl("img")
    postImgEl.setAttribute("src", post.image.src)
    postImgEl.setAttribute("alt", post.image.alt)

    postImgDivEl.append(postImgEl)

    const postContentDivEl = createEl("div")
    postContentDivEl.setAttribute("class", "post--content")

    const postContentTitleEl = createEl("h2")
    postContentTitleEl.innerText = post.title

    const postContentEl = createEl("p")
    postContentEl.innerText = post.content

    postContentDivEl.append(postContentTitleEl,postContentEl )

    const postCommentsDivEl = createEl("div")
    postCommentsDivEl.setAttribute("class", "post--comments")

    const postCommentsTitleEl = createEl("h3")
    postCommentsTitleEl.innerText = "Comments"

    function generateComment() {
      const postCommentDivEl = createEl("div")
      postCommentDivEl.setAttribute("class", "post--comment")
    
      const avatarSmallDivEl = createEl("div")
      avatarSmallDivEl.setAttribute("class", "avatar-small")

      const avatarSmallImgEl = createEl("img")
      avatarSmallImgEl.setAttribute("src", user.avatar)

      const commentEl = createEl("p")
      commentEl.innerText = post.comments[1].content

      avatarSmallDivEl.append(avatarSmallImgEl)
      postCommentDivEl.append(avatarSmallDivEl,commentEl)

      return postCommentDivEl
    }
    let postCommentDivEl1 = generateComment()
    console.log("POST COMMENT DIV:", postCommentDivEl1)
    let postCommentDivEl2 = generateComment()

    postCommentsDivEl.append(postCommentsTitleEl,postCommentDivEl1,postCommentDivEl2 )

    liEl.append(userChipEl, postImgDivEl, postContentDivEl, postCommentsDivEl)

    return liEl
  }
  let liEl = createFeedPost(post)
  feedEl.append(liEl)
