import { useEffect, useState } from "react";
import { TableLists } from "../molecules/Table";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";

export const ShowArticleLists = (): React.JSX.Element => {

  interface Post {
    id: number;
    title: string;
    content: string;
  }

  // TableListコンポーネントのProps定義
  interface TableListProps<Post> {
    data: Post[];
    colums: Array<{
      Header: string;
      accessor: keyof Post | ((instance: Post) => JSX.Element)
    }>;
  }

  const columns: TableListProps<Post>['colums'] = [
    {
      Header: "タイトル",
      accessor: "title",
    },
    {
      Header: "投稿内容",
      accessor: (post: Post) => (
        <Link
          to={`/general/article/detail/${post.id}`}
          style={{ textDecoration: 'underline' }}
        >
          {post.content}
        </Link>
      ),
    }
  ];

  // 現在のページ番号と最大ページ数を管理するステート
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(5);

  // 記事データを管理するステート
  const [post, setPost] = useState<Post[]>([]);

  /**
   * ページ変更時の処理
   */
  const handlePageOnChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
    // ページ番号が変更されたら新しいページのデータを取得する
    fetchArticleLists(selectedItem.selected + 1);
  }

  /**
   * 初期表示処理
   */
  const fetchArticleLists = async (page: number): Promise<void> => {
    try {
      const response = await axios.get(`http://localhost:3000/general/articles/lists?page=${page}`);
      // APIから取得したページ数に更新する
      setPageCount(response.data.last_page);
      // APIから取得した記事データを更新する
      setPost(response.data.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const statusCode = error.response ? error.response.status : null;
        switch (statusCode) {
          case (400):
            console.error("Bad Request:400 サーバーがリクエストを処理できませんでした。");
            break;

          default:
            console.error("予期せぬエラーが発生しました。");
        }
      } else {
        console.error("エラーが発生しました。", error);
      }
    }
  }

  /**
   * 初期表示処理を実行する
   */
  useEffect(() => {
    fetchArticleLists(1);
  }, [])

  return (
    <>
      <TableLists
        data={post}
        columns={columns}
      />
      <br></br>
      <ReactPaginate
        previousLabel={"◀︎"}
        nextLabel={"▶︎"}
        breakLabel={"..."}
        pageCount={5}
        onPageChange={handlePageOnChange}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        containerClassName={"flex justify-center list-none mx-3 my-3"}
        pageLinkClassName={"mx-3 px-3 py-1 border rounded hover:bg-gray-200"}
        previousLinkClassName=
        {`mx-3 px-3 py-1 border rounded hover:bg-gray-200 
          ${currentPage === 0
            ? "opacity-50 cursor-not-allowed"
            : ""},
          `}
        nextLinkClassName=
        {`mx-3 px-3 py-1 border rounded hover:bg-gray-200
          ${currentPage === pageCount - 1
            ? "opacity-50 cursor-not-allowed"
            : ""},
        `}
        breakLinkClassName={"mx-1 px-3 py-1 border rounded hover:bg-gray-200"}
        activeClassName={"text-blue-600 text-bold"}
      />
    </>
  )
}