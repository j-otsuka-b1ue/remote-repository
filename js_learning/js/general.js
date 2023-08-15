class Blog {
  constructor () {
    this.submitBtn = document.getElementById('submitBtn');
    this.editBtn = document.getElementById('editBtn');
    this.cancelEditBtn = document.getElementById('cancelBtn');
    this.title = document.getElementById('title');
    this.submitContent = document.getElementById('submitContent');
    this.statusMessage = document.getElementById('statusMessage');
    this.titleDis = document.getElementById('title_list');
    this.contentDis = document.getElementById('content_list');
    this.titleEdit = document.getElementById('titleEdit');
    this.contentEdit = document.getElementById('contentEdit');
    this.inputTitle = document.getElementById('titleEdit');
    this.inputContent = document.getElementById('contentEdit');
    this.disUpdateBtn = document.getElementById('editBtn');
    this.disCancelBtn = document.getElementById('deleteBtn');
    this.frame = document.getElementById('frame');
    this.editFrame = document.getElementById('editFrame');
    this.updateBtn = document.getElementById('updateBtn');
    this.submitBtn.addEventListener('click', this.createPost.bind(this));
    this.editBtn.addEventListener('click', this.editPost.bind(this));
    this.cancelEditBtn.addEventListener('click', this.cancelEditMode.bind(this));
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
          const dataIndex = 0;//取得してくる配列のインデックス番号を指定
          displayTitle.innerHTML = data[dataIndex].title;
          displayContent.innerHTML = data[dataIndex].body;
          //this.flag = true;
        } else {
          console.error("投稿に失敗しました" + response.status);
        }
      } catch (error) {
        console.error("エラーが発生しました" + error);
      }
    }  
    //flag = true;
  }
  //2回投稿不可のため、投稿ボタンが既に押されているか判定
  // checkFlag () {
  //   if (this.flag) {
  //     this.submitBtn.disabled = true;
  //   } else {
  //     this.submitBtn.disabled = false;
  //   }
  // }
  //編集モード
  async editPost () {
    this.frame.style.display = "none";
    this.editFrame.style.display = "block";
    const displayData = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await displayData.json();
    const dataIndex = 0;//取得してくる配列のインデックス番号を指定
    this.inputTitle.value = data[dataIndex].title;
    this.inputContent.innerHTML = data[dataIndex].body;
  }
  //更新機能
  updatePost () {
    const buttonOpen = document.getElementsByClassName('modalOpen')[0];
    const modal = document.getElementsByClassName('modal')[0];
    const buttonClose = document.getElementsByClassName('modalClose')[0];
    const body = document.getElementsByTagName('body')[0];
    buttonOpen.addEventListener('click', function(){
      modal.style.display = 'block';
      body.classList.add('open');
    });
    buttonClose.addEventListener('click',function(){
      modal.style.display = 'none';
      body.classList.remove('open');
    });
    modal.addEventListener('click', function(){ 
      modal.style.display = 'none';
      body.classList.remove('open');
  });    
  }

  cancelEditMode () {
    this.frame.style.display = "block";
    this.editFrame.style.display = "none";
  }
}
const blog = new Blog();
//blog.checkFlag();