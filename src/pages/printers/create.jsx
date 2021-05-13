import {useForm} from 'react-hook-form';
import {useRouter} from 'next/router';
import Head from 'next/head';

import Button from '@/common/components/Button';
import DefaultLayout from '@/layouts/core';
import Form from '@/common/components/Form';
import Input from '@/common/components/Input';
import SelectNative from '@/common/components/SelectNative';
import usePrinterCreate from '@/modules/reactQuery/mutations/useCreatePrinter';

const PrinterCreate = () => {
  const router = useRouter();

  const {
    formState: {errors},
    handleSubmit,
    register,
  } = useForm();

  const {mutate: createPrinter} = usePrinterCreate();

  const handlePrinterCreate = data => {
    createPrinter(data);
    router.push('/printers');
  };

  const handleCancel = () => {
    router.push('/printers');
  };

  return (
    <DefaultLayout>
      <Head>
        <title>Create printer</title>
      </Head>
      <Form onSubmit={handleSubmit(handlePrinterCreate)}>
        <h1 className="text-xl font-medium">Create printer</h1>
        <SelectNative label="Brand" options={['Xerox', 'HP']} register={register('brand')} />
        <Input
          error={errors?.model?.message}
          label="Model"
          register={register('model', {required: {value: true, message: 'Model is required'}})}
        />
        <div className="flex gap-4">
          <Button fullWidth onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="primary"
            onClick={handleSubmit(handlePrinterCreate)}
          >
            Submit
          </Button>
        </div>
      </Form>
    </DefaultLayout>
  );
};

export default PrinterCreate;
