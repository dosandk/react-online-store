export const tableConfig = [
  {
    id: 'images',
    title: 'Image',
    sortable: false,
    Cell: ({ data }) => {
      const [img] = data;

      return <td className="col">
        <img className="sortable-table-image" alt={img.source} src={img.url} />
      </td>
    }
  },
  {
    id: 'rating',
    title: 'rating',
    sortable: true,
    sortType: 'number'
  },
  {
    id: 'price',
    title: 'Price',
    sortable: true,
    sortType: 'number'
  },
  {
    id: 'title',
    title: 'Title',
    sortable: true,
    sortType: 'string'
  },
  {
    id: 'description',
    title: 'Description',
    sortable: true,
    sortType: 'string',
    Cell: ({ data }) => {
      return <td className="col">
        {data.slice(0, 50) + '...'}
      </td>;
    }
  }
];
