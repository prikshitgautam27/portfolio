import { useEffect } from 'react';

/**
 * Site-wide copy/selection protection.
 * Mount this once near the root of the app (e.g. in App.jsx), it renders nothing.
 *
 * Blocks: right-click menu, copy/cut, text selection, image/link dragging,
 * and common keyboard shortcuts (copy, cut, select-all, save, view-source, print,
 * and an attempt at the devtools shortcuts).
 *
 * Exemption: any element (or its ancestor) with the class "copy-allowed" is left
 * fully selectable/copyable — put this class on your contact info (email, phone)
 * so visitors can still copy those. Form fields (input/textarea/contenteditable)
 * are always exempt automatically so the site stays usable.
 */
export default function CopyProtection() {
  useEffect(() => {
    const isExempt = (target) =>
      target instanceof Element &&
      target.closest('.copy-allowed, input, textarea, [contenteditable="true"]');

    const blockEvent = (e) => {
      if (isExempt(e.target)) return;
      e.preventDefault();
    };

    const blockKeys = (e) => {
      if (isExempt(e.target)) return;
      const key = e.key?.toLowerCase();
      const mod = e.ctrlKey || e.metaKey;

      // Copy / Cut / Select-all / Save / View-source / Print
      if (mod && ['c', 'x', 'a', 's', 'u', 'p'].includes(key)) {
        e.preventDefault();
      }
      // Devtools shortcuts — note: modern Chrome/Firefox ignore preventDefault
      // for these and open devtools anyway. Kept as a harmless best-effort.
      if (key === 'f12' || (mod && e.shiftKey && ['i', 'j', 'c'].includes(key))) {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', blockEvent);
    document.addEventListener('copy', blockEvent);
    document.addEventListener('cut', blockEvent);
    document.addEventListener('selectstart', blockEvent);
    document.addEventListener('dragstart', blockEvent);
    document.addEventListener('keydown', blockKeys);

    return () => {
      document.removeEventListener('contextmenu', blockEvent);
      document.removeEventListener('copy', blockEvent);
      document.removeEventListener('cut', blockEvent);
      document.removeEventListener('selectstart', blockEvent);
      document.removeEventListener('dragstart', blockEvent);
      document.removeEventListener('keydown', blockKeys);
    };
  }, []);

  return null;
}
