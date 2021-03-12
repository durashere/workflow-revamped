import classNames from 'classnames';
import PropTypes from 'prop-types';

const Button = ({className, fullWidth, label, onClick, primary, square, type}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={classNames(
        'flex items-center justify-center rounded-xl h-12 uppercase font-medium duration-300 transition-all focus:ring-2',
        className,
        {
          'bg-blue-400 text-white hover:bg-blue-500 hover:shadow-lg': primary,
          'bg-coolGray-100 hover:bg-coolGray-200 shadow-inner': !primary,
          'w-full': fullWidth,
          'w-full md:w-48': !square && !fullWidth,
          'w-12 h-12 p-3': square,
        }
      )}
    >
      {label}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  fullWidth: PropTypes.bool,
  label: PropTypes.string,
  onClick: PropTypes.func,
  primary: PropTypes.bool,
  square: PropTypes.bool,
  type: PropTypes.string,
};

Button.defaultProps = {
  label: 'button',
};

export default Button;
