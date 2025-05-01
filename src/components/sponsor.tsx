import { cn } from '@/lib/utils'
import Image from 'next/image'
import { title } from '@/components/ui/text/title'
import { bronzeSponsors, getImageFilename, goldSponsors, platinumSponsors, silverSponsors, supportingSponsors, collaborativeSponsors, medpartnerSponsors } from '@/lib/sponsor'

export default async function Sponsor() {
  return (
    <section id='sponsor'
      className='min-h-screen flex flex-col items-center gap-8 md:gap-12 md:px-20 px-8 py-12 md:py-24 text-white'>
      <div className="flex flex-col gap-8 items-center">
        <title.h2>Platinum Sponsors</title.h2>
        <div className="flex max-md:flex-col gap-8 md:gap-16">
          {platinumSponsors.map((sponsor, index) => (
            <SponsorItem key={index} title={sponsor} src={getImageFilename(sponsor, 'platinum')} size="lg" />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-8 items-center mt-12">
        <title.h2>Gold Sponsors</title.h2>
        <div className="grid grid-cols-2 gap-8">
          {goldSponsors.map((sponsor, index) => (
            <SponsorItem key={index} title={sponsor} src={getImageFilename(sponsor, 'gold')} size="md" />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-8 items-center mt-12">
        <title.h2>Silver Sponsors</title.h2>
        <div className="flex flex-wrap justify-center w-full items-center gap-6">
          {silverSponsors.map((sponsor, index) => (
            <SponsorItem key={index} title={sponsor} src={getImageFilename(sponsor, 'silver')} size="sm" />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-8 items-center mt-12">
        <title.h2>Bronze Sponsors</title.h2>
        <div className="flex gap-4">
          {bronzeSponsors.map((sponsor, index) => (
            <SponsorItem key={index} title={sponsor} src={getImageFilename(sponsor, 'bronze')} size="sm" />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-8 items-center mt-12">
        <title.h2>Collaborative Sponsors</title.h2>
        <div className="flex flex-wrap justify-center w-full items-center gap-6">
          {collaborativeSponsors.map((sponsor, index) => (
            <SponsorItem key={index} title={sponsor} src={getImageFilename(sponsor, 'collaborative')} size="sm" />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-8 items-center mt-12">
        <title.h2>Supporting Sponsors</title.h2>
        <div className="flex flex-wrap justify-center w-full items-center gap-6">
          {supportingSponsors.map((sponsor, index) => (
            <SponsorItem key={index} title={sponsor} src={getImageFilename(sponsor, 'supporting_technician')} size="sm" />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-8 items-center mt-12">
        <title.h2>Media Partners</title.h2>
        <div className="flex flex-wrap justify-center w-full items-center gap-6">
          {medpartnerSponsors.map((sponsor, index) => (
            <SponsorItem key={index} title={sponsor} src={getImageFilename(sponsor, 'media')} size="sm" />
          ))}
        </div>
      </div>
    </section>
  )
}

function SponsorItem({
  title,
  src,
  size = "md",
}: {
  title: string,
  src: string,
  size: "sm" | "md" | "lg" | "xl",
}) {
  return (
    <div className="p-4 backdrop-blur-lg bg-white/20 rounded-lg grid place-items-center">
      <Image
        className={cn(
          'object-contain',
          size === "sm" && "w-32 h-20",
          size === "md" && "w-48 h-32",
          size === "lg" && "w-56 h-36",
          size === "xl" && "w-72 h-48"
        )}
        src={src}
        width={400}
        height={200}
        alt={title}
      />
    </div>
  )
}