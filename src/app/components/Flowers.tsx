import Image from 'next/image';

const Flowers = () => (
  <div className="flowers">
    <div className="flowers--mobile">
      <Image
        className="flowers__image flowers__image--left"
        src="/assets/laptop-flowers-left.png"
        alt=""
        width={320}
        height={510.39}
      />
      <Image
        className="flowers__image flowers__image--right"
        src="/assets/laptop-flowers-right.png"
        alt=""
        width={150}
        height={292.02}
      />
    </div>
    <div className="flowers--tablet-up">
      <Image
        className="flowers__image flowers__image--left"
        src="/assets/laptop-flowers-left.png"
        alt=""
        width={470.22}
        height={750}
      />
      <Image
        className="flowers__image flowers__image--middle"
        src="/assets/laptop-flowers-middle.png"
        alt=""
        width={452.02}
        height={163.146}
      />
      <Image
        className="flowers__image flowers__image--right"
        src="/assets/laptop-flowers-right.png"
        alt=""
        width={332.02}
        height={646.516}
      />
    </div>
  </div>
);
export default Flowers;
