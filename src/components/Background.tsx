import Image from 'next/image';

const Background = () => {
  return (
    <div className="background">
      <Image
        src="/assets/laptop-background.jpg"
        alt=""
        fill
        className="background__image background__image--sky"
      />
      <Image
        src="/assets/clouds-left.png"
        alt=""
        width={7100}
        height={1000}
        className="background__image background__image--cloud"
      />
      <Image
        src="/assets/clouds-right.png"
        alt=""
        width={7100}
        height={1000}
        className="background__image background__image--cloud"
        style={{
          left: '100%',
        }}
      />
    </div>
  );
};

export default Background;
