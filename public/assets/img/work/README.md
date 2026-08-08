# Teaser figures for Selected work

The homepage work list renders a figure next to each entry when one is declared.
Nothing here yet — every entry currently falls back to the text-only single-column
layout, which is why the list still reads like a bibliography rather than a project page.

## How to add one

1. Drop the image in this directory, e.g. `peek.png`.
2. Add a `figure` field to the matching entry in `src/pages/index.astro`:

```ts
{
  venue: "BMVC 2026",
  title: "PEEK: Picking Essential frames via Efficient Knowledge distillation",
  figure: { src: "/assets/img/work/peek.png", alt: "Frame selector picking 4 of 64 frames for a caption query" },
  ...
}
```

The card shows `venue` as a snug mono chip above the title. Optional `award`
sits beside it in muted sans (e.g. Best Presentation next to HSI 2024).

The entry picks up `work-card--figure` automatically and switches to the two-column layout.

## Spec

- **Aspect ratio** 16:10. Anything else is center-cropped by `object-fit: cover`.
- **Width** 960px is plenty (rendered at 240px, so 2× covers retina).
- **Format** PNG for diagrams and plots, JPG for photographs or video frames.
- **Alt text** describe what the figure *shows*, not that it is a figure. It is read
  aloud, and it is the only version of the figure a screen-reader user gets.
- Figures are center-cropped hard at this size — pick a region that survives it. A full
  paper teaser with six subplots will be illegible; a single panel usually works.

## Status

Three entries reuse thumbnails that already existed in `/assets/img/items/`.
Two have no figure anywhere in the repo and still render text-only:

| Entry | Figure | Suggested content |
| --- | --- | --- |
| PEEK | `work/peek.mp4` + `peek-poster.jpg` | Looping clip (`clip` field, not `figure`) |
| Retrieval Augmented Generation over Large Video Libraries | **missing** | The pipeline diagram: query → segment retrieval → grounded answer |
| Frame Sampling Strategies Matter | `items/pub_frame_sampling.jpg` | — |
| Multimodal Chaptering for Long-Form TV Newscast Video | `items/pub_chaptering.jpg` | — |
| Computer-based platforms … shot indexing | `items/pub_patent_shot_indexing.jpg` | — |

The reused thumbnails were cut for a 160px slot and are now rendered at 240px, so
they are worth re-exporting at 960px wide when there is time.
