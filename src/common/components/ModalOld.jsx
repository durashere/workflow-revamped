import {Transition} from '@headlessui/react';
import {useState, useRef} from 'react';
import PropTypes from 'prop-types';

import Button from '@/common/components/Button';
import useClickOutside from '@/common/hooks/useClickOutside';

const Modal = ({buttonClass, buttonLabel, children, submit, submitLabel}) => {
  const [showModal, setShowModal] = useState(false);

  const ref = useRef();
  useClickOutside(ref, () => setShowModal(false));

  if (showModal) {
    document.querySelector('body').style.overflow = 'hidden';
    document.querySelector('body').style.paddingRight = '16px';
  } else {
    document.querySelector('body').style.overflow = 'visible';
    document.querySelector('body').style.paddingRight = 0;
  }

  return (
    <div>
      {buttonClass ? (
        <button onClick={() => setShowModal(true)} className={buttonClass}>
          {buttonLabel}
        </button>
      ) : (
        <Button onClick={() => setShowModal(true)}>{buttonLabel}</Button>
      )}
      <Transition show={showModal}>
        <Transition.Child
          enter="duration-300 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-200 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className="fixed inset-0 z-50"
        >
          <div className="fixed inset-0 opacity-75 bg-gray-600" />
          <Transition.Child
            enter="transform transition-all duration-300 ease-out"
            enterFrom="opacity-0 translate-y-36 scale-95"
            enterTo="opacity-100 translate-y-0 scale-100"
            leave="transform transition-all ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 scale-100"
            leaveTo="opacity-0 translate-y-36 scale-95"
            className="flex items-center justify-center w-screen h-screen"
          >
            <div
              ref={ref}
              className="z-50 w-full max-w-xs max-h-screen text-left bg-white shadow-xl rounded-xl sm:max-w-xl"
            >
              <div className="p-4">{children}</div>
              <div className="flex flex-col gap-4 p-4 border-t sm:flex-row-reverse">
                <Button
                  fullWidth
                  variant="primary"
                  onClick={() => {
                    submit();
                    setShowModal(false);
                  }}
                >
                  {submitLabel || 'submit'}
                </Button>
                <Button fullWidth onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </Transition.Child>
        </Transition.Child>
      </Transition>
    </div>
  );
};

Modal.propTypes = {
  buttonClass: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  buttonLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  children: PropTypes.object,
  submit: PropTypes.func,
  submitLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default Modal;