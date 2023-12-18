import { useState } from 'react';
import Info from './Info';
import Image from 'next/image';

const MoreInfoSign = () => {
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  return (
    <>
      <button className="more-info-sign" onClick={() => setShowMoreInfo(true)}>
        <Image
          src="/assets/more-info-sign-head.png"
          width={150}
          height={112.63}
          alt="More Info Sign"
          className="more-info-sign__button-head"
        />
        <Image
          src="/assets/more-info-sign-pole.png"
          width={42.2}
          height={110.84}
          alt=""
          className="more-info-sign__button-pole"
        />
      </button>
      <Info
        closeModal={() => setShowMoreInfo(false)}
        showMoreInfo={showMoreInfo}
      />
    </>
  );
};

export default MoreInfoSign;
