import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router';
import {
  PageHeader,
  Tag,
  Descriptions,
  Row,
  Typography,
  Col,
  Spin,
  Result,
} from 'antd';

import { connect } from 'react-redux';
import { Dispatch, AnyAction, bindActionCreators } from 'redux';
import { AppState } from '../redux/reducers';
import { getMovie } from '../redux/actions/movie.actions';

const MovieDetailsPage: React.FC<MovieProps> = ({
  loadingMovie,
  movie,
  errorMovie,
  getMovie,
}) => {
  const history = useHistory();
  const { imdbID } = useParams();

  const content = (
    <>
      {movie && (
        <>
          <Descriptions size="small" column={2}>
            <Descriptions.Item label="Runtime">
              {movie.Runtime}
            </Descriptions.Item>
            <Descriptions.Item label="Genre">{movie.Genre}</Descriptions.Item>
            <Descriptions.Item label="Awards">{movie.Awards}</Descriptions.Item>
            <Descriptions.Item label="Country">
              {movie.Country}
            </Descriptions.Item>
            <Descriptions.Item label="imdbVotes">
              {movie.imdbVotes}
            </Descriptions.Item>
            <Descriptions.Item label="Year">{movie.Year}</Descriptions.Item>
            <Descriptions.Item label="Actors">{movie.Actors}</Descriptions.Item>
          </Descriptions>
          <Typography.Text strong>Plot:</Typography.Text>
          <Typography.Paragraph>{movie.Plot}</Typography.Paragraph>
        </>
      )}
    </>
  );

  useEffect(() => {
    getMovie(imdbID);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imdbID]);

  if (!errorMovie) {
    return (
      <>
        {loadingMovie ? (
          <Row justify="center">
            <Col span={24} offset={24}>
              <Spin size="default" />
            </Col>
          </Row>
        ) : (
          movie && (
            <PageHeader
              title={movie.Title}
              className="site-page-header"
              subTitle={movie.Director}
              onBack={() => history.push('/')}
              tags={<Tag color="blue">{movie.imdbRating}</Tag>}
            >
              <Row>
                <div style={{ flex: 1 }}>{content}</div>
                <div>
                  <img src={movie.Poster} alt="content" width="100%" />
                </div>
              </Row>
            </PageHeader>
          )
        )}
      </>
    );
  } else {
    return (
      <Result
        status="500"
        title="500"
        subTitle="Sorry, something went wrong."
      />
    );
  }
};

const mapStateToProps = (state: AppState) => {
  const { loadingMovie, movie, errorMovie } = state.movie;
  return {
    loadingMovie,
    movie,
    errorMovie,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
  dispatch,
  ...bindActionCreators({ getMovie }, dispatch),
});

type MovieProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetailsPage);
