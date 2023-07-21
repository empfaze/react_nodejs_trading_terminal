import React from 'react';
import classNames from 'classnames';
import { Align } from '../../types';
import './Table.css';

interface TableCellProps extends Omit<TableProps, 'header' | 'data'> {
  item: React.ReactNode;
}

interface TableProps {
  header: React.ReactNode[];
  data: React.ReactNode[][];
  align?: Align;
}

const TableCell: React.FC<TableCellProps> = ({ align, item }) => (
  <td
    className={classNames('TableCell', {
      [`TableCell--${align}`]: align,
    })}
  >
    {item}
  </td>
);

export const Table: React.FC<TableProps> = ({ header, data, align }) => (
  <table style={{ width: '100%', minWidth: '800px' }}>
    <tbody>
      <tr>
        {React.Children.toArray(
          header.map((item) => <TableCell item={item} align={align} />),
        )}
      </tr>

      {React.Children.toArray(
        data.map((row) => (
          <tr>
            {React.Children.toArray(
              row.map((item) => <TableCell item={item} align={align} />),
            )}
          </tr>
        )),
      )}
    </tbody>
  </table>
);
