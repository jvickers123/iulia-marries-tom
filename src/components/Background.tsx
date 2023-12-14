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
        src="/assets/clouds.png"
        alt=""
        width={7072.5}
        height={1230}
        className="background__image background__image--cloud"
      />
      <Image
        src="/assets/clouds.png"
        alt=""
        width={7072.5}
        height={1230}
        className="background__image background__image--cloud background__image background__image--cloud-delayed"
      />
    </div>
  );
};

export default Background;
