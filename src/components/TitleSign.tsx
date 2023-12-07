import Image from 'next/image';
import RSVPButton from './RSVPButton';
import { useState } from 'react';
import RSVPForm from './RSVPForm';
const titleSrc = '/assets/laptop-sign.png';
const titleAlt = 'Iulia marries Tom';
const titleSignImageClassName = 'titleSign__image';
const TitleSign = () => {
  const [showRSVP, setShowRSVP] = useState(false);

  return (
    <>
      <div className="titleSign">
        <div className="titleSign__title">
          <span className="titleSign__title--mobile">
            <Image
              src={titleSrc}
              width={300}
              height={248.96}
              alt={titleAlt}
              priority
              className={titleSignImageClassName}
            />
          </span>
          <span className="titleSign__title--tablet-up">
            <Image
              src={titleSrc}
              width={500}
              height={414.94}
              alt={titleAlt}
              priority
              className={titleSignImageClassName}
            />
          </span>
        </div>
        <RSVPButton setShowRSVP={setShowRSVP} />
        <span className="titleSign__title--mobile">
          <Image
            src="/assets/extra-pole.png"
            width={22}
            height={547}
            alt=""
            priority
            className="titleSign__bottom"
          />
        </span>
        <span className="titleSign__title--tablet-up">
          <Image
            src="/assets/extra-pole.png"
            width={35}
            height={547}
            alt=""
            priority
            className="titleSign__bottom"
          />
        </span>
      </div>
      <RSVPForm closeModal={() => setShowRSVP(false)} showRSVP={showRSVP} />
    </>
  );
};
export default TitleSign;
