import localFont from 'next/font/local';

export const transport = localFont({
  src: [
    {
      path: '../fonts/TRANSPORTH.woff2',
      weight: '600',
    },
    {
      path: '../fonts/TRANSPORT-medium.woff2',
      weight: '400',
    },
  ],
});

export const findAtSignsAndChangeFont = (text?: string) => {
  if (!text) return;

  const atSigns = text.match(/@/g);
  if (atSigns) {
    const newText = text.replace(
      /@/g,
      '<span className="secondary-font">@</span>'
    );
    return newText;
  }
  return text;
};
