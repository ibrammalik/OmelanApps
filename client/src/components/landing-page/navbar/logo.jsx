import brandImage from '@/assets/images/profile.png';

export const Logo = () => (
  <div className="flex gap-2 items-center">
    <img
      src={brandImage}
      alt="OMELAN Logo"
      className="size-8 rounded-full object-cover aspect-square"
    />
    <b>OMELAN</b>
  </div>
);
