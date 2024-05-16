import { useEffect, useRef, useState } from "react";
import { TableLists } from "../molecules/Table";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { Link, useParams, useNavigate } from "react-router-dom";

export const ShowArticleLists = (): React.JSX.Element => {

  const { page: pageParam } = useParams<{ page?: string }>();
  const initialPage = parseInt(pageParam ?? '1', 10);
  const isMounted = useRef(true);

  // 記事データの情報型定義
  interface Post {
    article_id: number;
    title: string;
    content: string;
  }

  // TableListコンポーネントのProps定義
  interface TableListProps<Post> {
    data: Post[];
    columns: Array<{
      Header: string;
      accessor: keyof Post | ((instance: Post) => JSX.Element)
    }>;
    id?: string;
  }

  const columns: TableListProps<Post>['columns'] = [
    {
      Header: "タイトル",
      accessor: "title",
    },
    {
      Header: "投稿内容",
      accessor: (post: Post) =>
        <Link
          to={`/general/article/detail/${post.article_id}`}
          style={{
            textDecoration: 'underline',
            color: 'blue',
          }}
        >
          {post.content}
        </Link>,
    }
  ];

  // 現在のページ番号と最大ページ数を管理するステート
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageCount, setPageCount] = useState(5);

  // 記事データを管理するステート
  const [post, setPost] = useState<Post[]>([]);

  // Navigate関数利用フック
  const navigate = useNavigate();


  /**
   * 初期表示処理
   */
  const fetchArticleLists = async (page: number): Promise<void> => {
    try {
      // ページ番号がNaNの場合は、1ページ目に移動する
      if (isNaN(page)) {
        navigate(`/general/articles/lists/page=1`,
          { replace: true });
        setCurrentPage(1);
        return;
      }
      const url = `http://localhost:3000/general/articles/lists?page=${page}`;
      const response = await axios.get(url);
      // レスポンスからページ数と記事データを更新
      setPageCount(response.data.last_page);

      // 記事データを取得し、データが存在しない箇所は空のデータを表示させる
      const filledPosts = [...response.data.data];
      while (filledPosts.length < 10) {
        filledPosts.push({ artcile_id: 0, title: "", content: "" });
      }
      setPost(filledPosts);
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
      } else if (isMounted.current) {
        console.error("エラーが発生しました。", error);
      }
    }
  }

  /**
   * 初期表示処理
   * ページパラメータ変更時にデータを取得
   */

  useEffect(() => {
    fetchArticleLists(currentPage);

    if (!pageParam) {
      navigate(`/general/articles/lists/page=${currentPage}`, { replace: true });
    }

    return () => {
      isMounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, navigate, pageParam]);


  /**
   * ページ番号の変更処理
   */
  useEffect((): void => {
    if (pageParam) {
      const newPage = parseInt(pageParam, 10);
      if (!isNaN(newPage) && newPage !== currentPage) {
        setCurrentPage(newPage);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageParam])

  /**
   * ページ変更時の処理
   */
  const handlePageOnChange = (selectedItem: { selected: number }): void => {
    const newPage = selectedItem.selected + 1;
    setCurrentPage(newPage);
    // ページ番号が変更されたら新しいページのデータを取得する
    fetchArticleLists(selectedItem.selected + 1);

    // 現在のページからページ数を1足したページに移動する
    navigate(`/general/articles/lists/page=${newPage}`, { replace: true });
  }


  return (
    <>
      <TableLists
        data={post.length > 0 ? post : []}
        columns={columns}
      />
      <br></br>
      <ReactPaginate
        previousLabel={"◀︎"}
        nextLabel={"▶︎"}
        breakLabel={"..."}
        pageCount={pageCount}
        onPageChange={handlePageOnChange}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        containerClassName={"flex justify-center list-none mx-3 my-3"}
        pageLinkClassName={"mx-3 px-3 py-1 border rounded hover:bg-gray-200"}
        previousLinkClassName=
        {`mx-3 px-3 py-1 border rounded hover:bg-gray-200 
          ${currentPage === 1
            ? "opacity-50 cursor-not-allowed select-none"
            : ""},
          `}
        nextLinkClassName=
        {`mx-3 px-3 py-1 border rounded hover:bg-gray-200
          ${currentPage === pageCount
            ? "opacity-50 cursor-not-allowed select-none"
            : ""},
        `}
        breakLinkClassName={"mx-1 px-3 py-1 border rounded hover:bg-gray-200"}
        activeClassName={"text-blue-600 text-bold "}
      />
    </>
  )
}