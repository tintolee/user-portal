import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import cs from 'classnames';

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  imgClasses?: string;
  styles?: React.CSSProperties | undefined;
  variant?: 'lazy-load' | 'eager-load';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MyImage: React.FC<Props> = ({
  src,
  alt,
  className,
  imgClasses,
  styles,
  variant = 'lazy-load',
  ...props
}) => {
  const classes = cs(className);
  return (
    <div className={classes} style={styles}>
      {variant === 'lazy-load' && (
        <LazyLoadImage
          alt={alt}
          height="100%"
          src={src} // use normal <img> attributes as props
          width="100%"
          className={imgClasses}
          // {...props}
        />
      )}
      {variant === 'eager-load' && (
        <img
          alt={alt}
          height="100%"
          src={src} // use normal <img> attributes as props
          width="100%"
          className={imgClasses}
          {...props}
        />
      )}
    </div>
  );
};

export default MyImage;
