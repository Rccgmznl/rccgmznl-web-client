import logo from '@assets/logo.png';

interface LogoProps {
    className?: string;
}

export default function Logo({ className = '' }: LogoProps) {
    return (
        <img
            src={logo}
            alt="RCCG Mount Zion Church"
            className={`h-auto w-auto object-contain ${className}`}
        />
    );
}
