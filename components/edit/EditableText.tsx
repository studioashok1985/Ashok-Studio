"use client";

import { useEdit, useEditField } from "./EditProvider";
import { ElementType, useRef } from "react";
import clsx from "clsx";

type Props = {
  path: string;
  as?: ElementType;
  className?: string;
  multiline?: boolean;
};

export function EditableText({ path, as = "span", className, multiline = false }: Props) {
  const { isEditMode, setField } = useEdit();
  const value = useEditField(path);
  const ref = useRef<HTMLElement>(null);
  const Tag = as as any;

  if (!isEditMode) {
    return <Tag className={className}>{value}</Tag>;
  }

  return (
    <Tag
      ref={ref}
      className={clsx(className, "editable-outline")}
      contentEditable
      suppressContentEditableWarning
      role="textbox"
      aria-label="Editable text"
      onBlur={(e: React.FocusEvent<HTMLElement>) => {
        const text = multiline ? e.currentTarget.innerText : e.currentTarget.innerText.replace(/\n/g, " ");
        void setField(path, text.trim());
      }}
    >
      {value}
    </Tag>
  );
}
