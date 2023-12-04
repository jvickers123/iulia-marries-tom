import Image from 'next/image';
import RSVPButton from './RSVPButton';
const titleSrc = '/assets/laptop-sign.png';
const titleAlt = 'Iulia marries Tom';
const titleSignImageClassName = 'titleSign__image';
const TitleSign = ({
  setShowRSVP,
}: {
  setShowRSVP: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="titleSign">
      <h1 className="titleSign__title">
        <span className="titleSign__title--mobile">
          <Image
            src={titleSrc}
            width={300}
            height={248.96}
            alt={titleAlt}
            className={titleSignImageClassName}
          />
        </span>
        <span className="titleSign__title--tablet-up">
          <Image
            src={titleSrc}
            width={500}
            height={414.94}
            alt={titleAlt}
            className={titleSignImageClassName}
          />
        </span>
      </h1>
      <RSVPButton setShowRSVP={setShowRSVP} />
    </div>
  );
};
export default TitleSign;
