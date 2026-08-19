# ScrollExpandMedia (Referenz-Snippet)
Kategorie: FX | Dependencies: framer-motion, next/image
Use-Case: Scroll-gesteuerter Expand-Hero fuer Video/YouTube/Bild

## Key-Features
- Wheel/Touch-Progress 0..1 (mediaFullyExpanded State)
- Media waechst 300->1550px (Desktop), 300->950px (Mobile)
- Content blendet bei Progress >= 1 ein
- Titel-Split mit translateX-Effekt
- YouTube-Embed mit autoplay/mute/loop/controls=0

## Technische Notizen
- CSP: frame-src youtube.com muss in Middleware stehen (aktuell nur google.com/maps)
- Farben an Token-System koppeln (var(--theme-primary) etc.)
- Scroll-Throttling pruefen (Batch 9 Nugget #36)
- Pointer-events:none auf Overlay fuer Media-Interaktion

## Code-Struktur
'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface Props {
  mediaType?: 'video' | 'image';
  mediaSrc: string;
  bgImageSrc: string;
  title?: string;
  children?: ReactNode;
}

// States: scrollProgress, showContent, mediaFullyExpanded, touchStartY
// Effekte: handleWheel, handleTouchStart/Move/End, handleScroll
// Berechnungen: mediaWidth/Height basierend auf Progress + isMobile
// Rendering: Background -> Media-Box (Video/YouTube/Image) -> Titel -> Content