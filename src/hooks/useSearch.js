import { useState } from 'react';

const useSearch = (fetch) => {
  const [q, setQ] = useState("");
  const [isFocus, setIsFocus] = useState(false);

  const toggleFocus = () => {
    setIsFocus(!isFocus);
  };

  const handleQAndFetch = (e) => {
    setQ(e.target.value);

    if (q.length > 0) {
      fetch();
    }
  };

  const reset = () => {
    setQ("");
  };

  return {
    q,
    isFocus,
    toggleFocus,
    handleQAndFetch,
    reset,
  }
}

export default useSearch;
