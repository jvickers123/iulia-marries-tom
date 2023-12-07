import Image from 'next/image';

const RSVPButton = ({
  setShowRSVP,
}: {
  setShowRSVP: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <>
      <button className="RSVP-button" onClick={() => setShowRSVP(true)}>
        <span className="RSVP-button--mobile">
          <Image src="/assets/rsvp.png" alt="RSVP" width={182.28} height={70} />
        </span>
        <span className="RSVP-button--tablet-up">
          <Image
            src="/assets/rsvp.png"
            alt="RSVP"
            width={303.8}
            height={116.667}
          />
        </span>
      </button>
    </>
  );
};

export default RSVPButton;
