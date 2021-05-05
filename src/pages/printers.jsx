import Head from 'next/head';

import Card from '@/common/components/Card';
import DefaultLayout from '@/layouts/core';
import PrinterCreate from '@/modules/printers/PrinterCreate';
import PrintersList from '@/modules/printers/PrintersList';
import Protect from '@/common/components/Protect';
import TonerCreate from '@/modules/printers/TonerCreate';
import TonerEdit from '@/modules/printers/TonerEdit';

const PrintersPage = () => {
  return (
    <DefaultLayout>
      <Head>
        <title>Printers</title>
      </Head>
      <Protect>
        <Card className="flex gap-2 mb-4">
          <PrinterCreate />
          <TonerCreate />
          <TonerEdit />
        </Card>
      </Protect>
      <PrintersList />
    </DefaultLayout>
  );
};

export default PrintersPage;