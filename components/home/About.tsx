"use client";

import { EditableImage } from "@/components/edit/EditableImage";
import { EditableText } from "@/components/edit/EditableText";
import { useEdit } from "@/components/edit/EditProvider";
import { Reveal } from "@/components/ui/Reveal";

export function About() {
  const { content, setField } = useEdit();

  return (
    <section id="about" className="bg-soft px-4 py-10 sm:px-5 md:px-10 md:py-12">
      <div className="mx-auto grid max-w-8xl items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <Reveal variant="clip">
          <div className="group photo-zoom aspect-[4/5]">
            <EditableImage
              src={content.about.image}
              onChange={(v) => setField("about.image", v)}
              alt="Wedding photographer in Jabalpur — Ashok Studio"
              className="h-full w-full"
              sizes="(min-width:1024px) 45vw, 100vw"
            />
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="kicker mb-3">
              <EditableText path="about.eyebrow" />
            </p>
            <h2 className="display whitespace-pre-line text-[clamp(1.85rem,8vw,3.8rem)] text-ink">
              <EditableText path="about.title" as="span" multiline />
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">
              <EditableText path="about.body" as="span" multiline />
            </p>
            <p className="kicker mt-5">
              <EditableText path="about.founders" />
            </p>
          </Reveal>

          <Reveal delayMs={100}>
            <dl className="mt-8 grid grid-cols-3 gap-2 border-t border-[var(--line)] pt-6 sm:gap-4">
              <div>
                <dt className="display text-2xl text-ink sm:text-3xl md:text-4xl">1985</dt>
                <dd className="kicker mt-2">Established</dd>
              </div>
              <div>
                <dt className="display text-2xl text-ink sm:text-3xl md:text-4xl">3</dt>
                <dd className="kicker mt-2">Generations</dd>
              </div>
              <div>
                <dt className="display text-2xl text-ink sm:text-3xl md:text-4xl">∞</dt>
                <dd className="kicker mt-2">Stories</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
