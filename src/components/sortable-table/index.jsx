import React, {useCallback, useEffect, useState} from 'react';

import './sortable-table.css';

const TableHeaderRow = ({ item, onClick }) => {
  const { id, sortable, order, title } = item;

  const onClickHandler = () => {
    onClick();
  };

  return <th className="col"
     data-id={id}
     data-sortable={sortable}
     onClick={onClickHandler}
     data-order={order}>
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

const EmptyPlaceholder = (colSpan) => {
  return <tr className="d-flex">
    <td className="col text-center" colSpan={colSpan}>No products</td>
  </tr>
};

const sort = (arr, field, order, sortType) => {
  const directions = {
    asc: 1,
    desc: -1
  };

  const direction = directions[order];

  return arr.sort((a, b) => {
    switch (sortType) {
      case 'number':
        return direction * (a[field] - b[field]);
      case 'string':
        return direction * a[field].localeCompare(b[field], ['ru', 'en']);
    }
  });
};

const SortableTable = ({
 config = [],
 data = [],
 sorted = {}
}) => {
  const [list, setList] = useState(data);

  const sortData = useCallback((data) => {
    const { field, order } = sorted;
    const column = config.find(item => item.id === field);
    const { sortType } = column;

    return sort(data, field, order, sortType);
  }, [config, sorted]);

  useEffect(() => {
    setList((prevList) => {
      if (prevList.length) {
        return data;
      }

      return sortData(data);
    });
  }, [data, sortData]);

  return <table className="table table-striped">
    <thead className="sortable-table-header">
      <tr className="d-flex">
        {
          config.map(item => <TableHeaderRow key={item.id} item={item} onClick={sortData}/>)
        }
      </tr>
    </thead>
    <tbody>
    {
      list.length
      ? <TableRows config={config} data={list} />
      : <EmptyPlaceholder/>
    }
    </tbody>
  </table>;
};

export default SortableTable;
