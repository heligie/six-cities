import clsx from 'clsx';
import { useEffect } from 'react';
import { useAppSelector, getPreviewOffersStatus, useActionCreators } from '../../shared/lib/redux';
import { getCurrentOffers, offersActions } from '../../entities/offers';
// import { fetchPreviewOffers } from '../../entities/offers/api/thunks';
import { APIStatus } from '../../shared/const';

import Layout from '../../shared/layout';
import Header from '../../widgets/header';
import Filter from '../../features/filter';
import AllOffers from '../../widgets/all-offers';
import Loader from '../../shared/ui/loader';

const Main = (): JSX.Element => {
  const currentOffers = useAppSelector(getCurrentOffers);
  const status = useAppSelector(getPreviewOffersStatus);
  const isLoading = status === APIStatus.Loading;
  const { fetchPreviewOffers } = useActionCreators(offersActions);

  useEffect(() => {
    fetchPreviewOffers().unwrap();
  }, [fetchPreviewOffers]);

  return (
    <Layout
      wrapper="page page--gray page--main"
      title="6 cities"
      header={<Header activeLogo />}
      content={
        <main className={clsx('page__main page__main--index', { 'page__main--index-empty': !currentOffers.length })}>
          <h1 className="visually-hidden">Cities</h1>
          {isLoading && <Loader />}
          {!isLoading && <Filter />}
          {!isLoading && <AllOffers />}
        </main>
      }
      footer={false}
    />
  );
};

export default Main;
