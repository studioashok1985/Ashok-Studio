"use client";

import { EditableImage } from "@/components/edit/EditableImage";
import { EditableText } from "@/components/edit/EditableText";
import { useEdit } from "@/components/edit/EditProvider";
import { Reveal } from "@/components/ui/Reveal";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export function Testimonials() {
  const { content, setField } = useEdit();
  const [active, setActive] = useState(0);
  const items = content.testimonials.items;
  const current = items[active] || items[0];

  if (!items.length || !current) return null;

  function previous() {
    setActive((index) => (index - 1 + items.length) % items.length);
  }

  function next() {
    setActive((index) => (index + 1) % items.length);
  }

  return (
    <section id="testimonials" className="bg-paper px-4 py-8 sm:px-5 md:px-10 md:py-10">
      <div className="mx-auto max-w-8xl">
        <Reveal>
          <p className="kicker mb-3">
            <EditableText path="testimonials.eyebrow" />
          </p>
          <h2 className="display max-w-3xl text-[clamp(1.85rem,7vw,3.6rem)] text-ink">
            <EditableText path="testimonials.title" />
          </h2>
        </Reveal>

        <Reveal delayMs={80}>
          <div className="mt-8 grid items-stretch gap-4 md:grid-cols-2 md:gap-6">
            <figure className="group">
              <div className="photo-zoom aspect-[4/5] bg-soft">
                <EditableImage
                  src={current.photo}
                  onChange={(value) => setField(`testimonials.items.${active}.photo`, value)}
                  alt={`${current.name} photograph`}
                  className="h-full w-full"
                  sizes="(min-width:768px) 50vw, 100vw"
                />
              </div>
              <figcaption className="mt-3 font-sans text-[11px] uppercase tracking-[0.16em] text-ink">
                <EditableText path={`testimonials.items.${active}.name`} />
              </figcaption>
            </figure>

            <figure>
              <div className="photo-zoom flex aspect-[4/5] items-center bg-soft">
                <EditableImage
                  src={current.review}
                  onChange={(value) => setField(`testimonials.items.${active}.review`, value)}
                  alt={`${current.name} review message`}
                  className="h-full w-full"
                  sizes="(min-width:768px) 50vw, 100vw"
                  fit="contain"
                />
              </div>
              <figcaption className="mt-3 font-sans text-[11px] uppercase tracking-[0.16em] text-muted">
                Their message
              </figcaption>
            </figure>
          </div>

          <div className="mt-6 flex justify-center">
            <div className="media-nav">
              <button
                type="button"
                onClick={previous}
                className="flex h-12 w-12 items-center justify-center rounded-full transition-colors hover:bg-soft"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={24} strokeWidth={1.8} />
              </button>
              <p className="min-w-[5.5rem] text-center font-sans text-[11px] font-medium uppercase tracking-[0.14em]">
                {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
              </p>
              <button
                type="button"
                onClick={next}
                className="flex h-12 w-12 items-center justify-center rounded-full transition-colors hover:bg-soft"
                aria-label="Next testimonial"
              >
                <ChevronRight size={24} strokeWidth={1.8} />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
