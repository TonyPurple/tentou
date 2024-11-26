import { cn } from '@/lib/utils';

type Props = {
  src?: string;
  alt: string;
  size?: 'small' | 'medium' | 'large';
};

export function CustomImage({ src, alt, size = 'medium' }: Props) {
    return (
        <img
            src={src || `https://avatar.vercel.sh/${alt}`}
            className={cn(
                'shadow-sm border border-black/10 rounded-md',
                size === 'small' && 'size-10',
                size === 'medium' && 'size-14',
                size === 'large' && 'size-20',
            )}
        />
    );
}
