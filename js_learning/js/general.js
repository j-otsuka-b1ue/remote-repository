class Blog {
  constructor () {
    this.submitBtn = document.getElementById('submitBtn');
    this.title = document.getElementById('title');
    this.submitContent = document.getElementById('submitContent');
    this.statusMessage = document.getElementById('statusMessage');
    this.submitBtn.addEventListener('click', this.createPost.bind(this));
  }

  async createPost() {
    const title = this.title.value;
    const content = this.submitContent.value;

    const newPost = {
      title: title,
      body: content,
      userId: 1
    };
    //バリデーションチェック
    this.statusMessage.innerHTML = "";
    const titleVal = document.getElementById('title');
    const contentVal = document.getElementById('submitContent');
    errorCreate01.innerHTML = "";
    errorCreate02.innerHTML = "";
    if (titleVal.value === "" && contentVal.value === "") {
      errorCreate01.innerHTML = "↑タイトルが入力されていません";
      errorCreate02.innerHTML = "↑内容が入力されていません";
    } else if (titleVal.value === "") {
      errorCreate01.innerHTML = "↑タイトルが入力されていません";
    } else if (contentVal.value === "") {
      errorCreate02.innerHTML = "↑内容が入力されていません";
    } else {
      errorCreate01.innerHTML = "";
      errorCreate02.innerHTML = "";
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
          errorCreate01.innerHTML = "";
          errorCreate02.innerHTML = "";
          //取得したデータをHTMLに出力する
          const displayData = await fetch('https://jsonplaceholder.typicode.com/posts');
          const data = await displayData.json();
          const displayTitle = document.getElementById('title_list');
          const displayContent = document.getElementById('content_list');
          displayTitle.innerHTML = data.title;
          displayContent.innerHTML = data.body;
        } else {
          console.error("投稿に失敗しました" + response.status);
        }
      } catch (error) {
        console.error("エラーが発生しました" + error);
      }
    }
  }
}
const blog = new Blog();