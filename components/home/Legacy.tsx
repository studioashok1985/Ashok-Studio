"use client";

import { EditableImage } from "@/components/edit/EditableImage";
import { EditableText } from "@/components/edit/EditableText";
import { useEdit } from "@/components/edit/EditProvider";
import { Reveal } from "@/components/ui/Reveal";

const PORTRAIT_FOCUS = ["center 22%", "center 48%", "center 16%"];

export function Legacy() {
  const { content, setField } = useEdit();

  return (
    <section id="legacy" className="bg-soft px-4 py-10 sm:px-5 md:px-10 md:py-12">
      <div className="mx-auto max-w-8xl">
        <Reveal>
          <p className="kicker mb-3">
            <EditableText path="legacy.eyebrow" />
          </p>
          <h2 className="display whitespace-pre-line max-w-3xl text-[clamp(1.9rem,8vw,4.4rem)] text-ink">
            <EditableText path="legacy.title" as="span" multiline />
          </h2>
          <p className="mt-3 max-w-md text-base text-muted">
            <EditableText path="legacy.subtitle" as="span" />
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
          {content.legacy.people.map((person, i) => (
            <Reveal key={person.id} delayMs={i * 100}>
              <article className="group flex flex-col items-center text-center">
                <div className="relative aspect-square w-[min(100%,16.5rem)] overflow-hidden rounded-full bg-paper">
                  <EditableImage
                    src={person.image}
                    onChange={(value) => setField(`legacy.people.${i}.image`, value)}
                    alt={`${person.name} portrait`}
                    className="h-full w-full rounded-full"
                    sizes="264px"
                    objectPosition={PORTRAIT_FOCUS[i] || "center 20%"}
                  />
                </div>
                <div className="py-4">
                  <p className="kicker text-accent">
                    <EditableText path={`legacy.people.${i}.years`} />
                  </p>
                  <h3 className="mt-2 font-display text-[1.75rem] tracking-wide text-ink md:text-4xl">
                    <EditableText path={`legacy.people.${i}.name`} />
                  </h3>
                  <p className="mt-3 text-sm uppercase leading-relaxed tracking-[0.08em] text-muted">
                    <EditableText path={`legacy.people.${i}.label`} />
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
