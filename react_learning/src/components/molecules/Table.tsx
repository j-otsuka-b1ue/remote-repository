import { Column, useTable, Accessor, UseTableOptions } from "react-table";

type Props<T extends object> = {
  data: T[];
  columns: Column<T>[];
}

interface Post {
  id: number;
  title: string;
  content: string;
}

type CustomColumn = Omit<Column<Post>, 'accessor'> & {
  accessor?: keyof Post | Accessor<Post>;
}

type TableListProps = {
  data: Post[];
  columns: CustomColumn[];
}

export const TableLists = ({ data, columns }: TableListProps): React.JSX.Element => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable<Post>({ columns, data } as UseTableOptions<Post>);

  return (
    <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        {headerGroups.map(headerGroup => (
          // 各ヘッダーグループの行にborderを適用
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              // 各ヘッダーセルにpaddingとborderを適用
              <th {...column.getHeaderProps()} className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200">
        {rows.map(row => {
          prepareRow(row);
          return (
            // 各ボディの行にborderを適用
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => (
                // 各ボディセルにpaddingとborderを適用
                <td {...cell.getCellProps()} className="px-6 py-4 whitespace-nowrap">
                  {cell.render('Cell')}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}