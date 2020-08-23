import React, { useEffect, useState } from 'react';
import { Table, Input } from 'antd';
import { useHistory } from 'react-router-dom';

import { connect } from 'react-redux';
import { Dispatch, AnyAction, bindActionCreators } from 'redux';
import { AppState } from '../redux/reducers';
import { getMovieList } from '../redux/actions/movie.actions';

const MoviesPage: React.FC<MoviesProps> = ({
  getMovieList,
  movies,
  totalMovies,
  loadingMovies,
}) => {
  const history = useHistory();
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState('Pokemon');
  const [slice, setSlice] = useState<number>();

  const columns = [
    {
      title: 'Title',
      dataIndex: 'Title',
      key: 'title',
    },
    {
      title: 'Year',
      dataIndex: 'Year',
      key: 'year',
    },
    {
      title: 'IMDb Id',
      dataIndex: 'imdbID',
      key: 'imdbID',
    },
  ];

  useEffect(() => {
    if (page) {
      getMovieList(page, searchValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, searchValue]);

  useEffect(() => {
    if (!searchValue) {
      setSearchValue('Pokemon');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  const tablePaginition = (current: number) => {
    if (current % 2 === 0) {
      setSlice(5);
      setPage((current * 5) / 10);
    } else {
      setSlice(0);
      setPage(Math.trunc(((current * 5) / 10) + 1));
    }
  };

  return (
    <>

      <Input.Search
        placeholder="input search text"
        size="large"
        onSearch={(searchValue) => setSearchValue(searchValue)}
        onChange={(e) => setSearchValue(e.target.value)}
        allowClear
      />
      <Table
        columns={columns}
        loading={loadingMovies}
        dataSource={movies && movies.slice(slice, slice === 5 ? 10 : 5)}
        rowKey="imdbID"
        pagination={{ total: totalMovies }}
        onChange={(paginition: any) => {
          tablePaginition(paginition.current);
        }}
        onRow={(record) => ({
          onClick: () => history.push(`/movie/${record.imdbID}`),
        })}
      />

    </>
  );
};

const mapStateToProps = (state: AppState) => {
  const { loadingMovies, movies, totalMovies } = state.movieList;
  return {
    loadingMovies,
    movies,
    totalMovies
  };
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
  dispatch,
  ...bindActionCreators({ getMovieList }, dispatch),

});

type MoviesProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(MoviesPage);
