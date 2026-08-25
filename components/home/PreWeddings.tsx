"use client";

import { EditableImage } from "@/components/edit/EditableImage";
import { EditableText } from "@/components/edit/EditableText";
import { useEdit } from "@/components/edit/EditProvider";
import { Reveal } from "@/components/ui/Reveal";

export function PreWeddings() {
  const { content, setField } = useEdit();

  return (
    <section id="prewedding" className="bg-paper px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-8xl">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="kicker mb-5">
              <EditableText path="prewedding.eyebrow" />
            </p>
            <h2 className="display text-[clamp(2.2rem,5vw,4rem)] text-ink">
              <EditableText path="prewedding.title" />
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted md:text-xl">
              <EditableText path="prewedding.body" as="span" multiline />
            </p>
          </Reveal>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-x-10 md:gap-y-20">
          <Reveal variant="clip" className="md:col-span-5">
            <div className="group photo-zoom aspect-[4/5]">
              <EditableImage
                src={content.prewedding.images[0]}
                onChange={(value) => setField("prewedding.images.0", value)}
                alt="Ashok Studio couple portrait"
                className="h-full w-full"
                sizes="(min-width:768px) 42vw, 100vw"
              />
            </div>
          </Reveal>
          <Reveal variant="clip" delayMs={100} className="md:col-span-7 md:mt-24">
            <div className="group photo-zoom aspect-[3/2]">
              <EditableImage
                src={content.prewedding.images[1]}
                onChange={(value) => setField("prewedding.images.1", value)}
                alt="Ashok Studio romantic wedding portrait"
                className="h-full w-full"
                sizes="(min-width:768px) 58vw, 100vw"
              />
            </div>
          </Reveal>
          <Reveal variant="clip" className="md:col-span-5 md:col-start-7">
            <div className="group photo-zoom aspect-[2/3]">
              <EditableImage
                src={content.prewedding.images[2]}
                onChange={(value) => setField("prewedding.images.2", value)}
                alt="Ashok Studio couple portrait"
                className="h-full w-full"
                sizes="(min-width:768px) 42vw, 100vw"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
