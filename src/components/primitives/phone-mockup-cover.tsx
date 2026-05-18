import Image from "next/image";
import { cn } from "@/lib/utils";

type PhoneMockupCoverProps = {
  screens: [string, string, string];
  alt: string;
  className?: string;
};

const PHONE_LAYOUTS = [
  // Back-left phone — slightly receded, rotated counter-clockwise
  "left-[6%]  top-[14%]  z-10 -rotate-[8deg] scale-[0.92]",
  // Center phone — forward, no rotation
  "left-1/2   top-[6%]   z-20 -translate-x-1/2",
  // Back-right phone — slightly receded, rotated clockwise
  "right-[6%] top-[14%]  z-10 rotate-[8deg]   scale-[0.92]",
] as const;

export function PhoneMockupCover({
  screens,
  alt,
  className,
}: PhoneMockupCoverProps) {
  return (
    <div
      className={cn(
        "relative aspect-[16/10] w-full overflow-hidden rounded-t-xl border-b border-hairline bg-paper",
        className,
      )}
      aria-label={alt}
    >
      {screens.map((src, i) => (
        <div
          key={src}
          className={cn(
            "absolute h-[88%] w-[26%] overflow-hidden rounded-[1.25rem] border border-hairline bg-surface shadow-md",
            PHONE_LAYOUTS[i],
          )}
        >
          <Image
            src={src}
            alt=""
            fill
            sizes="(max-width: 768px) 33vw, 11vw"
            className="object-cover object-top"
          />
        </div>
      ))}
    </div>
  );
}
