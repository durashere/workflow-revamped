import {Controller, useForm} from 'react-hook-form';
import {useMutation, useQueryClient} from 'react-query';
import {useState} from 'react';

import {updatePrinter, deletePrinter} from '@/services/printerService';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import Select from '@/components/Select';
import Square from '@/components/Square';

const getColor = color => {
  switch (color) {
    case 'Black':
      return 'bg-gray-400';
    case 'Cyan':
      return 'bg-cyan-200';
    case 'Magenta':
      return 'bg-fuchsia-200';
    case 'Yellow':
      return 'bg-yellow-200';

    default:
      return 'bg-transparent';
  }
};

const PrinterEdit = ({printer, uncategorizedToners}) => {
  const [editToners, setEditToners] = useState('');

  const {control, errors, handleSubmit, register} = useForm();

  const queryClient = useQueryClient();

  const updatePrinterMutation = useMutation(updatePrinter, {
    onSuccess: () => {
      queryClient.invalidateQueries('printers');
      queryClient.invalidateQueries('uncategorized-toners');
    },
  });
  const handlePrinterEdit = async data => {
    updatePrinterMutation.mutate({id: printer._id, updatedPrinter: data});
  };
  const handlePullToner = async tonerId => {
    const updatedToners = printer.toners.filter(toner => toner._id !== tonerId);
    updatePrinterMutation.mutate({id: printer._id, updatedPrinter: {toners: updatedToners}});
  };
  const handlePushToner = tonerId => {
    const updatedToners = [...printer.toners.map(toner => toner._id), tonerId];
    updatePrinterMutation.mutate({id: printer._id, updatedPrinter: {toners: updatedToners}});
  };

  const deletePrinterMutation = useMutation(deletePrinter, {
    onSuccess: () => {
      queryClient.invalidateQueries('printers');
      queryClient.invalidateQueries('uncategorized-toners');
    },
  });
  const handlePrinterDelete = async printerId => {
    deletePrinterMutation.mutate(printerId);
  };

  return (
    <Modal
      buttonLabel={<span className="align-middle material-icons">more_vert</span>}
      buttonClass=" h-12 hover:bg-coolGray-200 transition-all duration-300 rounded-xl"
      submit={handleSubmit(handlePrinterEdit)}
    >
      <div className="relative flex flex-col gap-4">
        <button onClick={() => handlePrinterDelete(printer._id)} className="absolute top-0 right-0">
          <span className="material-icons">close</span>
        </button>
        <form className="flex flex-col gap-4" onSubmit={e => e.preventDefault()}>
          <legend className="text-4xl">Details</legend>
          <Controller
            name="brand"
            control={control}
            defaultValue={printer.brand}
            render={({onChange, value}) => (
              <Select label={'Brand'} setValue={onChange} value={value} options={['Xerox', 'HP']} />
            )}
          />
          <label htmlFor="model">
            Model
            <input
              autoComplete="off"
              className="block w-48 h-12 px-3 rounded-xl bg-coolGray-200"
              defaultValue={printer.model}
              name="model"
              ref={register({required: true})}
            />
            {errors.model && <span className="block text-red-600">You must provide model</span>}
          </label>
        </form>

        <p className="text-4xl ">Toners</p>
        {printer.toners.map(toner => (
          <div key={toner._id} className="flex flex-col gap-2 ">
            <div className="flex items-center gap-4">
              <Square p={4} className={getColor(toner.color)}>
                {toner.amount}
              </Square>
              <p className="font-medium">{toner.code}</p>
              <button onClick={() => handlePullToner(toner._id)}>
                <span className="p-1 m-1 align-middle rounded-xl material-icons hover:bg-coolGray-50">
                  close
                </span>
              </button>
            </div>
          </div>
        ))}
        {!!uncategorizedToners?.length && (
          <div className="flex gap-4">
            <Select
              label={'Add toner'}
              value={editToners}
              setValue={setEditToners}
              options={[...new Set(uncategorizedToners?.map(toner => toner.code))]}
            />
            <Button
              label={'Add'}
              onClick={() => {
                if (editToners !== '') {
                  const toner = uncategorizedToners.find(toner => toner.code === editToners);
                  handlePushToner(toner._id);
                  setEditToners('');
                }
              }}
            />
          </div>
        )}
      </div>
    </Modal>
  );
};

export default PrinterEdit;
