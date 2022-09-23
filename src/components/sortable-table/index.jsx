import React, {useState} from 'react';

import './sortable-table.css';

const TableHeaderRow = ({ title }) => {
  return <th className="col">
    <span>{title}</span>
  </th>
};

const TableCol = ({ column = {}, config = [] }) => {
  return config.map(({id, Cell}) => {
    return Cell
      ? <Cell key={id} data={column[id]} />
      : <td key={id} className="col">{column[id]}</td>;
  });
}

const TableRows = ({config = [], data}) => {
  return data.map((column = {}) =>
    <tr key={column.id} className="d-flex">
      <TableCol column={column} config={config} />
    </tr>
  );
};

const EmptyPlaceholder = ({colSpan}) => {
  return <tr className="d-flex">
    <td className="col text-center" colSpan={colSpan}>No products</td>
  </tr>
};

const SortableTable = ({
 config = [],
 data = [],
}) => {
  const [list] = useState(data);

  return <table className="table table-striped">
    <thead className="sortable-table-header">
      <tr className="d-flex">
        {
          config.map(item => <TableHeaderRow key={item.id} title={item.title}/>)
        }
      </tr>
    </thead>
    <tbody>
    {
      list.length
      ? <TableRows config={config} data={list} />
      : <EmptyPlaceholder colSpan={config.length} />
    }
    </tbody>
  </table>;
};

export default SortableTable;
