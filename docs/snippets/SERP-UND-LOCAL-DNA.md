# SERP, LOCAL PACK & AI EXTRACTION DNA (Batch 24)

## Local Pack Tracking Schema (Cockpit / Bereich B)
rank: A-G | title | nap{address, phone} | metrics{rating, reviews_count} | is_verified
-> Blaupause fuer das Ranking-Tracker-Schema im Cockpit (NAP-Monitoring, Review-Delta).

## LLM-gestuetztes HTML-Parsing (SerpApi-Pattern)
bert-base-local-results als Fallback, wenn CSS-Selektoren durch Google-DOM-Updates brechen.
Nokolexbor (5.2x schneller als Nokogiri) fuer HTML-Preprocessing.
-> Architektur-Muster fuer autarkes Cockpit-Scraping ohne teure API-Abhaengigkeit.

## SERP-Feature-Extraktion (Bereich C)
Knowledge Graph | Featured Snippets | People Also Ask (PAA) | AI Overviews Citation
-> Feature-Liste fuer das "Lokale Sichtbarkeits- & KI-Monitoring" Dashboard.