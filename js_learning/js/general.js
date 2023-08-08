class PostBlog {
  constructor () {
    this.submitBtn = document.getElementById('submitBtn');
    this.title = document.getElementById('title');
    this.submitContent = document.getElementById('submitContent');
    this.statusMessage = document.getElementById('statusMessage');
    this.submitBtn.addEventListener('click', this.createPost.bind(this));
  }

  formValidation () {
    const titleVal = document.getElementById('errorCreate01');
    const contentVal = document.getElementById('errorCreate02');
    errorCreate01.innerHTML = "";
    errorCreate02.innerHTML = "";
    if (titleVal.value === "" && contentVal.value === "") {
      errorCreate01.innerHTML = "タイトルが入力されていません";
      errorCreate02.innerHTML = "内容が入力されていません";
    } else if (titleVal.value === "") {
      errorCreate01.innerHTML = "タイトルが入力されていません";
    } else if (contentVal.value === "") {
      errorCreate02.innerHTML = "内容が入力されていません";
    } else {
      errorCreate01.innerHTML = "";
      errorCreate02.innerHTML = "";
    }
  }

  async createPost() {
    const title = this.title.value;
    const content = this.submitContent.value;

    const newPost = {
      title: title,
      body: content,
      userId: 1
    };

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: "POST",
        headers: {
          'Content-Type':"application/json"
        },
        body: JSON.stringify(newPost)
      });

      if (response.status === 201) {
        this.statusMessage.innerHTML = "投稿に成功しました(status:201)"
        this.title.value = "";
        this.submitContent.value = "";
      } else {
        console.error("投稿に失敗しました" + response.status);
      }
    } catch (error) {
      console.error("エラーが発生しました" + error);
    }
  }
}
const postBlog = new PostBlog();