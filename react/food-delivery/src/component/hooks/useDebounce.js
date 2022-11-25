import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const useDebounce = (value, delay) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const Handle = setTimeout(() => setDebounceValue(value), delay);

    return () => clearTimeout(Handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return debounceValue;
};

useDebounce.propTypes = {
  value: PropTypes.any.isRequired,
  delay: PropTypes.number.isRequired,
};

export default useDebounce;
