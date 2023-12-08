import { useState } from 'react';
import Info from './Info';

const MoreInfoSign = () => {
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  return (
    <>
      <button className="more-info-sign" onClick={() => setShowMoreInfo(true)}>
        More info
      </button>
      <Info
        closeModal={() => setShowMoreInfo(false)}
        showMoreInfo={showMoreInfo}
      />
    </>
  );
};

export default MoreInfoSign;
