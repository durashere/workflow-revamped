import {dehydrate} from 'react-query/hydration';
import {getSession} from 'next-auth/client';
import {QueryClient} from 'react-query';
import axios from 'axios';
import Head from 'next/head';

import Card from '@/common/components/Card';
import DefaultLayout from '@/layouts/core';
import TonersList from '@/modules/toners/TonersList';

const TonersListPage = () => {
  return (
    <DefaultLayout>
      <Head>
        <title>Toners</title>
      </Head>
      <Card className="flex flex-col gap-4">
        <TonersList />
      </Card>
    </DefaultLayout>
  );
};

export const getServerSideProps = async context => {
  const session = await getSession(context);

  if (session.user.role !== 'admin') {
    return {
      redirect: {
        destination: '/printers',
        permanent: false,
      },
    };
  }

  const getToners = async () => {
    const {data} = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/toners`, {
      headers: {
        Authorization: `bearer ${session.accessToken}`,
      },
    });
    return data.toners;
  };

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery('toners', getToners);

  return {
    props: {dehydratedState: dehydrate(queryClient)},
  };
};

export default TonersListPage;