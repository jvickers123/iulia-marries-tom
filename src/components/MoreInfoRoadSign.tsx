import { ShowPanels } from '@/types/guest-page-types';
import { toggleDrawer } from '@/utilities/drawer';
import Image from 'next/image';

const MoreInfoRoadSign = ({
  setIsDrawerOpen,
}: {
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <>
      <button
        className="RSVP-button"
        onClick={toggleDrawer({ open: true, setIsDrawerOpen })}>
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

export default MoreInfoRoadSign;
