import { ShowPanels } from '@/types/guest-page-types';
import Image from 'next/image';

const SetShowGeneralInfo = ({
  setShowPanels,
}: {
  setShowPanels: React.Dispatch<React.SetStateAction<ShowPanels>>;
}) => {
  return (
    <>
      <button
        className="RSVP-button"
        onClick={() => setShowPanels(prev => ({ ...prev, generalInfo: true }))}>
        <span className="RSVP-button--mobile">
          <Image
            src="/assets/more-info-road-sign.png"
            alt="RSVP"
            width={182.28}
            height={70}
          />
        </span>
        <span className="RSVP-button--tablet-up">
          <Image
            src="/assets/more-info-road-sign.png"
            alt="RSVP"
            width={303.8}
            height={116.667}
          />
        </span>
      </button>
    </>
  );
};

export default SetShowGeneralInfo;
