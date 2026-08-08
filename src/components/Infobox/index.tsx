import React from 'react';
import styles from './Infobox.module.css';
import { TipIcon, WarningIcon, ShieldIcon } from './icons';

interface InfoboxProps {
  variant: 'tip' | 'warning' | 'security';
  title?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const variantConfig = {
  tip: {
    defaultTitle: 'Tip',
    Icon: TipIcon,
    role: 'note',
  },
  warning: {
    defaultTitle: 'Warning',
    Icon: WarningIcon,
    role: 'alert',
  },
  security: {
    defaultTitle: 'Security Note',
    Icon: ShieldIcon,
    role: 'alert',
  },
};

export default function Infobox({ variant, title, icon, children, className }: InfoboxProps) {
  const config = variantConfig[variant];
  const IconComponent = config.Icon;
  const displayTitle = title || config.defaultTitle;
  
  return (
    <aside 
      className={`${styles.infobox} ${styles[variant]} ${className || ''}`}
      role={config.role}
    >
      <div className={styles.header}>
        <span className={styles.icon}>
          {icon || <IconComponent />}
        </span>
        <strong className={styles.title}>{displayTitle}</strong>
      </div>
      <div className={styles.content}>
        {children}
      </div>
    </aside>
  );
}
