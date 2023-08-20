class Blog {
  constructor () {
    this.submitBtn = document.getElementById('submitBtn');
    this.editBtn = document.getElementById('editBtn');
    this.cancelEditBtn = document.getElementById('cancelBtn');
    this.title = document.getElementById('title');
    this.titleVal = document.getElementById('title');
    this.getTitle = document.getElementById('title');
    this.content = document.getElementById('submitContent');
    this.submitContent = document.getElementById('submitContent');
    this.contentVal = document.getElementById('submitContent');
    this.statusMessage = document.getElementById('statusMessage');
    this.titleDis = document.getElementById('title_list');
    this.contentDis = document.getElementById('content_list');
    this.titleEdit = document.getElementById('titleEdit');
    this.contentEdit = document.getElementById('contentEdit');
    this.inputTitle = document.getElementById('titleEdit');
    this.inputContent = document.getElementById('contentEdit');
    this.inputTitleVal = document.getElementById('titleEdit');
    this.inputContentVal = document.getElementById('contentEdit');
    this.disUpdateBtn = document.getElementById('editBtn');
    this.disCancelBtn = document.getElementById('deleteBtn');
    this.frame = document.getElementById('frame');
    this.editFrame = document.getElementById('editFrame');
    this.updateBtn = document.getElementById('updateBtn');
    this.deleteBtn = document.getElementById('deleteBtn');
    this.closeModalBtn01 = document.getElementById('closeModalBtn01');
    this.closeModalBtn02 = document.getElementById('closeModalBtn02');
    this.closeModalBtn03 = document.getElementById('closeModalBtn03');
    this.closeModalBtn04 = document.getElementById('closeModalBtn04');
    this.errorCreate01 = document.getElementById('errorCreate01');
    this.errorCreate02 = document.getElementById('errorCreate02');
    this.submitBtn.addEventListener('click', this.createPost.bind(this));
    this.editBtn.addEventListener('click', this.editPost.bind(this));
    this.cancelEditBtn.addEventListener('click', this.cancelEditMode.bind(this));
    this.updateBtn.addEventListener('click',this.openUpdateModal.bind(this));
    this.closeModalBtn01.addEventListener('click', this.closeUpdateModal.bind(this));
    this.closeModalBtn02.addEventListener('click', this.closeUpdateModal.bind(this));
    this.closeModalBtn03.addEventListener('click', this.closeDeleteModal.bind(this));
    this.closeModalBtn04.addEventListener('click', this.closeDeleteModal.bind(this));
    this.deleteBtn.addEventListener('click', this.openDeleteModal.bind(this));
    this.deleteBtn.addEventListener('click', this.deletePost.bind(this));
    this.titleVal.addEventListener('change', this.validateForm01.bind(this));
    this.contentVal.addEventListener('change', this.validateForm01.bind(this));
    this.inputTitleVal.addEventListener('change', this.openUpdateModal.bind(this));
    this.inputContentVal.addEventListener('change', this.openUpdateModal.bind(this));
    this.validateForm01();
    this.checkSubmitBtnState();
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
        const displayData = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await displayData.json();
        const displayTitle = document.getElementById('title_list');
        const displayContent = document.getElementById('content_list');
        this.statusMessage.innerHTML = "投稿に成功しました(status:201)"
        displayTitle.innerHTML = this.getTitle.value;
        displayContent.innerHTML = this.content.value;
        this.title.value = "";
        this.submitContent.value = "";
        this.errorCreate01.innerHTML = "";
        this.errorCreate02.innerHTML = "";
        this.submitBtn.disabled = true;
        sessionStorage.setItem('submitBtnDisabled', 'true');
        this.checkSubmitBtnState();
      } else {
        console.error("投稿に失敗しました" + response.status);
      }
    } catch (error) {
      console.error("エラーが発生しました" + error);
    }
  }

    checkSubmitBtnState() {
      const storedState = sessionStorage.getItem('submitBtnDisabled');
    if (storedState === 'true') {
      this.submitBtn.disabled = true;
      }
    }

    validateForm01 () {
    this.statusMessage.innerHTML = "";
    const errorCreate01 = document.getElementById('errorCreate01');
    const errorCreate02 = document.getElementById('errorCreate02');
    errorCreate01.innerHTML = "";
    errorCreate02.innerHTML = "";
    if (this.titleVal.value === "" && this.contentVal.value === "" ) {
      errorCreate01.innerHTML = "";
      errorCreate02.innerHTML = "";
      this.submitBtn.disabled = true;
    } else if (this.titleVal.value === "") {
      errorCreate01.innerHTML = "↑タイトルが入力されていません";
      errorCreate02.innerHTML = "";
      this.submitBtn.disabled = true;
    } else if (this.contentVal.value === "") {
      errorCreate01.innerHTML = "";
      errorCreate02.innerHTML = "↑内容が入力されていません";
      this.submitBtn.disabled = true;
    } else {
      errorCreate01.innerHTML = "";
      errorCreate02.innerHTML = "";
      this.submitBtn.disabled = false;
      this.checkSubmitBtnState();
    }
  }

  //編集モード
  async editPost () {
    this.frame.style.display = "none";
    this.editFrame.style.display = "block";
    const displayData = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await displayData.json();
    const disTitleToEdit = document.getElementById('titleEdit');
    const disContentToEdit = document.getElementById('contentEdit');
    const getTitleToEdit = document.getElementById('title_list');
    const getContentToEdit = document.getElementById('content_list');
    disTitleToEdit.value = getTitleToEdit.textContent;
    disContentToEdit.value = getContentToEdit.textContent;
  }

  openUpdateModal () {
    const updateModal = document.querySelector('.modal_div');
    const disUpdateTitle = document.getElementById('updatedTitle');
    const disUpdateContent = document.getElementById('updatedContent');
    const updatedTitle = document.getElementById('titleEdit');
    const updatedContent = document.getElementById('contentEdit');
    const errorCreate03 = document.getElementById('errorCreate03');
    const errorCreate04 = document.getElementById('errorCreate04');
    errorCreate03.innerHTML = "";
    errorCreate04.innerHTML = "";
    if (updatedTitle.value === "" && updatedContent.value === "") {
      errorCreate03.innerHTML = "↑更新内容が入力されていません";
      errorCreate04.innerHTML = "↑更新内容が入力されていません";
      this.updateBtn.disabled = true;
    } else if (updatedTitle.value === "") {
      errorCreate03.innerHTML = "↑更新内容が入力されていません";
      errorCreate04.innerHTML = "";
      this.updateBtn.disabled = true;
    } else if (updatedContent.value === "") {
      errorCreate03.innerHTML = "";
      errorCreate04.innerHTML = "↑更新内容が入力されていません";
      this.updateBtn.disabled = true;
    } else {
      errorCreate03.innerHTML = "";
      errorCreate04.innerHTML = "";
      this.updateBtn.disabled = false;
      updateModal.classList.add('is-active');
      disUpdateTitle.innerHTML = updatedTitle.value;
      disUpdateContent.innerHTML = updatedContent.value;
    }
  }

  closeUpdateModal() {
    const updateModal = document.querySelector('.modal_div');
    const refUpdatedTitle = document.getElementById('updatedTitle');
    const refUpdatedContent = document.getElementById('updatedContent');
    updateModal.classList.remove('is-active');
    this.titleDis.innerHTML = refUpdatedTitle.textContent;
    this.contentDis.innerHTML = refUpdatedContent.textContent;
    this.frame.style.display = "block";
    this.editFrame.style.display = "none";

  }
  
  cancelEditMode () {
    this.frame.style.display = "block";
    this.editFrame.style.display = "none";
  }

  //更新機能
  async patchPost () {
    const postId = 1;
    const url = `https:jsonplaceholder.typicode.com/posts/${postId}`;
    const body = document.getElementById('contentEdit');
    const updateData = {
      id: Number(postId),
      title: title,
      body: body
    };

    try {
      const responseFetch = await fetch(url, {
        method:'PATCH',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(updateData)
      });
      if (responseFetch.status === 200) {
        console.log("投稿の更新に成功しました" + responseFetch.status);
      } 
    } catch (error) {
      console.error("エラーが発生しました" + error);
    }
  }

  //削除機能
  async deletePost () {
    const postIdToDelete = 1;
    const url = `https://jsonplaceholder.typicode.com/posts/${postIdToDelete}`;
    try {
      const deleteResponse = await fetch(url, {
        method: 'DELETE'
      });
      if (deleteResponse.status === 200) {
        console.log('投稿が削除されました');
      } 
    } catch (error) {
      console.error('エラーが発生しました' + error);
    }
  }
  openDeleteModal () {
    const deleteModal = document.querySelector('.modal_div_delete');
    const disDeleteTitle = document.getElementById('deleteTitle');
    const disDeleteContent = document.getElementById('deleteContent');
    const deletedTitle = document.getElementById('title_list');
    const deletedContent = document.getElementById('content_list');
    deleteModal.classList.add('is-active');
    disDeleteTitle.innerHTML = deletedTitle.textContent;
    disDeleteContent.innerHTML =  deletedContent.textContent;
  }

  closeDeleteModal() {
    const deleteModal = document.querySelector('.modal_div_delete');
    const deletedTitle = document.getElementById('title_list');
    const deletedContent = document.getElementById('content_list');
    deleteModal.classList.remove('is-active');
    deletedTitle.textContent = "";
    deletedContent.textContent = "";
    this.frame.style.display = "block";
    this.editFrame.style.display = "none";
  }
}
const blog = new Blog();