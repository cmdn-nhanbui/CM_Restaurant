import React, { useState, useEffect } from 'react';

type ImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  fallbackSrc?: string;
};

const DEFAULT_FALLBACK = 'https://lightwidget.com/wp-content/uploads/localhost-file-not-found.jpg';

export const Image: React.FC<ImageProps> = ({ src, alt, fallbackSrc = DEFAULT_FALLBACK, ...rest }) => {
  const [imgSrc, setImgSrc] = useState<string>(src || fallbackSrc);

  useEffect(() => {
    setImgSrc(src || fallbackSrc);
  }, [src, fallbackSrc]);

  const handleError = () => {
    setImgSrc(fallbackSrc);
  };

  return <img src={imgSrc} alt={alt} onError={handleError} {...rest} />;
};
