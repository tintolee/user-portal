import React, { ReactNode, useState } from 'react';
import cs from 'classnames';

interface Props {
  children: ReactNode;
  to: string;
}

const SocialIcon = ({ children, to }: Props) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      target="_blank"
      rel="noreferrer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      href={to}
      className={cs(
        'ss-w-10 ss-text-white ss-h-10 ss-duration-200 ss-rounded-full ss-flex ss-justify-center ss-items-center',
        {
          'ss-bg-primary1-500': isHovered,
          'ss-bg-primary1-300': !isHovered
        }
      )}>
      {children}
    </a>
  );
};

export default SocialIcon;
