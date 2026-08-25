"use client";

import { useEdit } from "./EditProvider";
import { Check, LogOut, RotateCcw, X } from "lucide-react";

export function EditToolbar() {
  const { isAuthenticated, isEditMode, dirty, enterEditMode, exitEditMode, save, resetToDefault, logout } = useEdit();

  if (!isAuthenticated) return null;

  return (
    <div className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-1/2 z-[300] w-[calc(100%-1.5rem)] max-w-xl -translate-x-1/2 sm:w-auto">
      <div className="flex items-center justify-center gap-2 overflow-x-auto rounded-full border border-[var(--line)] bg-ink px-3 py-2 shadow-lg">
        {!isEditMode ? (
          <button
            onClick={enterEditMode}
            className="rounded-full bg-paper px-4 py-2 text-sm font-medium text-ink transition hover:bg-soft"
          >
            Edit this page
          </button>
        ) : (
          <>
            <span className="hidden pl-2 pr-1 text-[10px] uppercase tracking-[0.16em] text-paper/70 sm:inline">
              {dirty ? "Unsaved — Save to publish live" : "Edits publish to the live website when you Save"}
            </span>
            <button
              onClick={() => {
                void save().catch((error: unknown) => {
                  alert(error instanceof Error ? error.message : "Could not save. Try replacing fewer photos at a time.");
                });
              }}
              disabled={!dirty}
              className="flex items-center gap-1 rounded-full bg-paper px-3 py-2 text-sm font-medium text-ink disabled:opacity-40"
            >
              <Check size={15} /> Save
            </button>
            <button
              onClick={exitEditMode}
              className="flex items-center gap-1 rounded-full border border-white/20 px-3 py-2 text-sm text-paper"
            >
              <X size={15} /> Exit
            </button>
            <button
              onClick={() => {
                if (confirm("Reset all edits back to the original content on the live website?")) {
                  void resetToDefault().catch((error: unknown) => {
                    alert(error instanceof Error ? error.message : "Could not reset.");
                  });
                }
              }}
              className="flex items-center gap-1 rounded-full px-3 py-2 text-sm text-paper/50"
              title="Reset to default content"
            >
              <RotateCcw size={15} />
            </button>
          </>
        )}
        <button onClick={logout} className="ml-1 flex items-center gap-1 rounded-full px-3 py-2 text-sm text-paper/40" title="Log out">
          <LogOut size={15} />
        </button>
      </div>
    </div>
  );
}
