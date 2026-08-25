"use client";

import { EditableText } from "@/components/edit/EditableText";
import { Reveal } from "@/components/ui/Reveal";

export function Intro() {
  return (
    <section id="intro" className="bg-paper px-4 py-6 sm:px-5 md:px-10 md:py-8">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <p className="kicker mb-4">
            <EditableText path="intro.eyebrow" />
          </p>
        </Reveal>
        <Reveal delayMs={80}>
          <h2 className="display whitespace-pre-line text-[clamp(1.9rem,8vw,4.6rem)] text-ink">
            <EditableText path="intro.title" as="span" multiline />
          </h2>
        </Reveal>
        <Reveal delayMs={140}>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted md:text-xl">
            <EditableText path="intro.body" as="span" multiline />
          </p>
        </Reveal>
      </div>
    </section>
  );
}
