import 'bootstrap/dist/css/bootstrap.min.css';
import {useDispatch, useSelector} from 'react-redux';
import {episodesApiGet} from '../../redux/slices/episodeSlice';
import {useEffect} from 'react';
import {openModal, closeModal} from '../../redux/slices/modalSlice';
import Ep_detail from './Ep_detail';

export default function Ep_list() {
  const dispatch = useDispatch();
  const {list, loading, error} = useSelector(state => state.episodeKey);
  const {isOpen, selectedSeries} = useSelector(state => state.modalKey);

  useEffect(() => {
    dispatch(episodesApiGet());
  }, [dispatch]);

  const clickEpi = id => {
    dispatch(openModal(id.series));
    // console.log('클릭한 시리즈:', id.series);
  };

  const closeEpi = () => {
    dispatch(closeModal());
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>에러...</p>;

  return (
    <div className="container">
      <h2 className="text-center">중요 에피소드 모음(더빙)</h2>
      <p className="text-center">블로거 "멍멍식"님의 포스팅을 참고했어요</p>
      <Ep_detail
        isOpen={isOpen}
        selectedSeries={selectedSeries}
        closeEpi={closeEpi}
      />
      <br />
      <div className="row text-center">
        {[...list].map((v, idx) => (
          <div className="col-md-4 mb-4" key={idx}>
            {' '}
            <div className="card" onClick={() => clickEpi(v)}>
              <img src={v.img} alt="에피소드" className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title"> {v.intro}</h5>
                <p className="card-text">{v.quarter}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}