import React from 'react';
import styled from 'styled-components';
import Table from 'antd/lib/table';
import Tooltip from 'antd/lib/tooltip';

import useSearch from 'components/services/Search/useSearch';

const ResultsWrapper = styled.div`
  width: 90%;
  margin: 50px auto;
  > div {
    border-radius: 5px;
    overflow-x: scroll;
  }

  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    width: 80%;
  }
  @media only screen and (min-width: 1024px) {
    width: 70%;
  }
`;

const columns = [
  {
    title: 'Naziv',
    dataIndex: 'title',
    align: 'center',
    // eslint-disable-next-line react/display-name
    render: (text, record) => (
      <a href={record.link} rel="noopener noreferrer" target="_blank">
        {text}
      </a>
    ),
  },
  {
    title: 'Grad',
    dataIndex: 'grad',
    align: 'center',
  },
  {
    title: 'Cijena',
    dataIndex: 'cijena',
    align: 'center',

    sorter: {
      compare: (a, b) => a.cijena_parsed - b.cijena_parsed,
    },
  },
  {
    title: 'Detaljni Opis',
    dataIndex: 'opis',
    ellipsis: {
      showTitle: false,
    },
    responsive: ['lg'],
    // eslint-disable-next-line react/display-name
    render: opis => (
      <Tooltip placement="topLeft" title={opis}>
        {opis}
      </Tooltip>
    ),
  },
  {
    title: 'Kat',
    dataIndex: 'kat',
    align: 'center',
    responsive: ['md'],
    width: 100,
  },
  {
    title: 'Velicina',
    dataIndex: 'size',
    width: 100,
    align: 'center',
    sorter: {
      compare: (a, b) => a.size - b.size,
    },
    responsive: ['md'],
    // eslint-disable-next-line react/display-name
    render: text => <p>{text} m2</p>,
  },
  {
    title: 'Broj Soba',
    dataIndex: 'brojSoba',
    align: 'center',
  },
  {
    title: 'Kontakt',
    dataIndex: 'contact',
    align: 'center',
    responsive: ['lg'],
  },
];

const SearchResults = () => {
  const { data, loadingOglasi } = useSearch();

  return (
    <ResultsWrapper>
      <Table
        columns={columns}
        dataSource={data}
        loading={loadingOglasi}
        pagination={{
          position: ['bottomCenter'],
          defaultPageSize: 20,
          pageSizeOptions: [10, 20, 50, 100],
          showSizeChanger: true,
        }}
      />
    </ResultsWrapper>
  );
};

export default SearchResults;
