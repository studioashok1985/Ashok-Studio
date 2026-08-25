"use client";

import { EditableImage } from "@/components/edit/EditableImage";
import { EditableText } from "@/components/edit/EditableText";
import { useEdit } from "@/components/edit/EditProvider";
import { Reveal } from "@/components/ui/Reveal";

export function Philosophy() {
  const { content, setField } = useEdit();

  return (
    <section id="philosophy" className="bg-soft px-4 py-10 sm:px-5 md:px-10 md:py-14">
      <div className="mx-auto grid max-w-8xl items-center gap-8 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-6">
          <Reveal>
            <p className="kicker mb-5">Our way of seeing</p>
            <h2 className="display whitespace-pre-line text-[clamp(1.9rem,8vw,4.4rem)] text-ink">
              <EditableText path="philosophy.line1" as="span" multiline />
            </h2>
          </Reveal>
          <Reveal delayMs={80}>
            <p className="mt-5 display text-[clamp(1.8rem,3.5vw,3rem)] italic text-ink/75">
              <EditableText path="philosophy.line2" />
            </p>
          </Reveal>
          <Reveal delayMs={120}>
            <div className="mt-6 h-px w-16 bg-accent" />
            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted md:text-lg">
              <EditableText path="philosophy.body" as="span" multiline />
            </p>
          </Reveal>
        </div>

        <Reveal variant="clip" className="lg:col-span-6" delayMs={100}>
          <div className="group photo-zoom aspect-[4/5] w-full lg:aspect-[5/6]">
            <EditableImage
              src={content.philosophy.image}
              onChange={(value) => setField("philosophy.image", value)}
              alt="A quiet moment from an Ashok Studio wedding"
              className="h-full w-full"
              sizes="(min-width:1024px) 45vw, 100vw"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
