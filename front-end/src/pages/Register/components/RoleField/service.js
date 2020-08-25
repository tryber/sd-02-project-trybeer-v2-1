const handleRole = ({ value, setRole }) => {
  if (value) {
    setRole('admin');
  } else {
    setRole('client');
  }
};

export default handleRole;
