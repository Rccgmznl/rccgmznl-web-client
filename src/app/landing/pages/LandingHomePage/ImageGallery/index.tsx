import unavailableImg from "@shared/images/unavailable.png";

type GallerySlot =
    | "lead"
    | "feature"
    | "strip"
    | "community"
    | "worship"
    | "prayer";

interface GalleryImage {
    id: string;
    slot: GallerySlot;
    src: string;
    alt: string;
    focalPoint?: {
        x: number;
        y: number;
    };
}

const galleryImages: GalleryImage[] = [
    {
        id: "1",
        slot: "lead",
        src: unavailableImg,
        alt: "Church members praying together during worship",
        focalPoint: { x: 50, y: 40 },
    },
    {
        id: "2",
        slot: "feature",
        src: unavailableImg,
        alt: "A worshipper raising her hands in praise",
        focalPoint: { x: 50, y: 35 },
    },
    {
        id: "3",
        slot: "strip",
        src: unavailableImg,
        alt: "Celebration lights during a church gathering",
    },
    {
        id: "4",
        slot: "community",
        src: unavailableImg,
        alt: "The congregation worshipping together",
        focalPoint: { x: 50, y: 40 },
    },
    {
        id: "5",
        slot: "worship",
        src: unavailableImg,
        alt: "A large crowd raising their hands during worship",
        focalPoint: { x: 50, y: 45 },
    },
    {
        id: "6",
        slot: "prayer",
        src: unavailableImg,
        alt: "A church member praying during the service",
        focalPoint: { x: 50, y: 40 },
    },
];

const galleryLayout: Record<GallerySlot, string> = {
    lead: `
        col-span-1 row-span-2
        lg:col-start-1 lg:col-span-4
        lg:row-start-1 lg:row-span-2
    `,

    feature: `
        col-span-1 row-span-1
        lg:col-start-5 lg:col-span-3
        lg:row-start-1 lg:row-span-1
    `,

    strip: `
        col-span-1 row-span-1
        lg:col-start-5 lg:col-span-3
        lg:row-start-2 lg:row-span-1
    `,

    community: `
        col-span-2 row-span-2
        lg:col-start-8 lg:col-span-5
        lg:row-start-1 lg:row-span-2
    `,

    worship: `
        col-span-2 row-span-2
        lg:col-start-1 lg:col-span-7
        lg:row-start-3 lg:row-span-1
    `,

    prayer: `
        col-span-2 row-span-2
        lg:col-start-8 lg:col-span-5
        lg:row-start-3 lg:row-span-1
    `,
};

export default function ImageGallery() {
    return (
        <section
            aria-labelledby="gallery-heading"
            className="bg-neutral-900 text-white"
        >
            <div className="mx-auto w-full max-w-[90rem] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
                <header className="mb-8 sm:mb-10">
                    <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-primary-900">
                        Moments from our community
                    </p>

                    <h2
                        id="gallery-heading"
                        className="
                            max-w-3xl text-3xl font-black
                            uppercase leading-none
                            tracking-[-0.035em]
                            sm:text-4xl lg:text-5xl
                        "
                    >
                        From our recent{" "}
                        <span className="text-primary-900">
                            events
                        </span>
                    </h2>

                    <p className="mt-4 max-w-xl text-sm font-semibold uppercase tracking-[0.12em] text-white/60 sm:text-base">
                        The worship and praise never ends
                    </p>
                </header>

                <ul
                    className="
                        grid grid-cols-2
                        auto-rows-[8.5rem] gap-3
                        sm:auto-rows-[11rem] sm:gap-4
                        lg:grid-cols-12
                        lg:grid-rows-[15rem_6.5rem_16rem]
                        lg:auto-rows-auto lg:gap-5
                    "
                >
                    {galleryImages.map((image) => {
                        const focalPoint = image.focalPoint
                            ? `${image.focalPoint.x}% ${image.focalPoint.y}%`
                            : "center";

                        return (
                            <li
                                key={image.id}
                                className={galleryLayout[image.slot]}
                            >
                                <figure
                                    className="
                                        group relative h-full w-full
                                        overflow-hidden rounded-2xl
                                        bg-neutral-800
                                        shadow-lg shadow-black/20
                                        sm:rounded-3xl
                                    "
                                >
                                    <img
                                        src={image.src}
                                        alt={image.alt}
                                        loading="lazy"
                                        decoding="async"
                                        style={{
                                            objectPosition: focalPoint,
                                        }}
                                        className="
                                            h-full w-full object-cover
                                            transition duration-700
                                            group-hover:scale-[1.035]
                                        "
                                    />

                                    <div
                                        aria-hidden="true"
                                        className="
                                            absolute inset-0
                                            bg-gradient-to-t
                                            from-black/35
                                            via-transparent
                                            to-transparent
                                            opacity-70
                                            transition-opacity duration-300
                                            group-hover:opacity-40
                                        "
                                    />

                                    <div
                                        aria-hidden="true"
                                        className="
                                            absolute inset-0
                                            rounded-[inherit]
                                            ring-1 ring-inset
                                            ring-white/10
                                        "
                                    />
                                </figure>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
}
