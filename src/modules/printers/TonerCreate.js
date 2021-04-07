import {Controller, useForm} from 'react-hook-form';

import Button from '@/common/components/Button';
import Input from '@/common/components/Input';
import Modal from '@/common/components/Modal';
import Select from '@/common/components/Select';
import {useToggle} from '@/common/hooks/useToggle';
import usePrinterActions from './hooks/usePrinterActions';

const TonerCreate = () => {
  const {
    control,
    formState: {errors},
    handleSubmit,
    register,
  } = useForm();
  const [open, toggle] = useToggle(false);
  const {handleTonerCreate} = usePrinterActions({toggle});

  return (
    <>
      <Button onClick={toggle}>Create Toner</Button>
      <Modal open={open} setOpen={toggle}>
        <Modal.Title>Create Toner</Modal.Title>
        <form className="space-y-4" onSubmit={handleSubmit(handleTonerCreate)}>
          <Modal.Description>Details</Modal.Description>
          <Input
            error={errors?.code?.message}
            label={'Code'}
            register={register('code', {required: {value: true, message: 'Code is required'}})}
          />
          <Controller
            name="color"
            control={control}
            defaultValue={'Black'}
            render={({field}) => (
              <Select {...field} label={'Color'} options={['Black', 'Cyan', 'Magenta', 'Yellow']} />
            )}
          />
          <input type="submit" className="hidden" />
        </form>
        <Modal.Buttons>
          <Button fullWidth onClick={toggle}>
            Cancel
          </Button>
          <Button fullWidth variant="primary" onClick={handleSubmit(handleTonerCreate)}>
            Submit
          </Button>
        </Modal.Buttons>
      </Modal>
    </>
  );
};

export default TonerCreate;
