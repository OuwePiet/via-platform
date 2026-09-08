# VIA Studio Baseline

## Purpose
VIA Studio is the creative front end of the existing VIA NFT workflow. It is not a separate product silo.

Target flow:

`VIA Studio -> draft -> metadata -> storage choice -> Review Mint -> NFT/social post`

The design preserves the historical VIA/Lumen work around drafts, Media Repair, metadata, Review Mint, controlled minting and separate storage/payment modules.

## Phase A — free browser-side editor
The first useful Studio version must create no external compute bill for VIA. Processing should happen locally in the user's browser where practical.

Baseline tools:
- upload/import an image;
- canvas resize and crop;
- rotate and flip;
- freehand pen/brush;
- eraser;
- text;
- basic shapes;
- object move/resize/rotate;
- foreground/background colors;
- basic brightness/contrast/filter controls where browser performance permits;
- undo/redo;
- layers or a simple object stack;
- transparent background where supported;
- export PNG/JPEG;
- preserve a Studio draft locally or in an approved VIA draft store;
- `Use for NFT` hand-off into the existing media/metadata workflow.

No blockchain transaction is required merely to edit an image.

## Touch and device requirements
Studio is first-class on iPhone/iPad, Android/Samsung and desktop browsers. Controls must work with pointer and touch input, avoid tiny targets, and degrade cleanly on memory-constrained devices.

Large source images should be bounded before allocating a canvas. Export size and memory limits must be explicit rather than allowing a tab to crash.

## Candidate 2D implementation
Prefer a mature client-side canvas library with React integration, touch/pointer support and a commercial-compatible open-source license. Konva/react-konva is the leading implementation candidate for the first proof of concept because it maps well to an interactive React editor. Fabric.js remains a candidate if SVG-centric editing/export becomes a real requirement.

A dependency is not adopted merely because it is convenient. Before production adoption verify current license, maintenance, bundle impact, browser compatibility and security history.

## 2.5D and 3D
3D is staged rather than bundled into the first editor.

### Free 2.5D
Where practical in-browser:
- perspective/tilt preview;
- depth/parallax-style presentation;
- NFT card/frame preview;
- simple rotation/lighting presentation that does not pretend a flat image is a generated 3D model.

### True 3D
A later module may view GLB/GLTF locally and may add controlled editing/viewing with Three.js/React Three Fiber or an equivalent reviewed library.

Image-to-3D AI is not part of the free baseline unless a sufficiently capable browser-local implementation proves reliable across VIA's supported devices.

## Paid external creation services
AI image generation, true AI image-to-3D, heavy rendering, background generation/removal or other provider-billed compute must use VIA's prepaid service rule.

Required sequence:

`request -> quote total price -> payment confirmation -> one-use entitlement -> bounded provider call -> result -> usage/cost record`

Never call a billable provider before the entitlement is confirmed. The quote must distinguish the service being purchased and show the total amount before approval. VIA may include a reasonable service margin.

Provider keys stay server-side. They must never be shipped in browser JavaScript.

## Storage hand-off
Studio output does not imply permanent storage. After creation the user receives an explicit storage choice appropriate to the NFT/media workflow.

Possible layers are deliberately separate:
- local draft/browser processing;
- ordinary/temporary external object storage;
- content-addressed/durable NFT media storage such as a reviewed IPFS/Arweave path;
- DeSo reference/social/NFT data.

VIA must state the actual storage class and must not label ordinary object storage as permanent.

Any paid upload/storage path follows the prepaid external-service rule before VIA creates the billable resource.

## Portability and DeSo exit resilience
Studio source/export formats should remain portable. The editor must not encode DeSo-specific assumptions into the artwork itself.

The hand-off to minting goes through VIA's service/protocol boundary so that Studio remains useful if VIA later needs to support a different social/protocol/storage route. DeSo is the primary path today, not a permanent dependency of the editor.

## Security
- Treat uploaded media and metadata as untrusted input.
- Do not execute user-supplied HTML/JavaScript.
- Validate MIME/type, dimensions and size independently of filename extension.
- Sanitize SVG before rendering if SVG is ever enabled.
- Revoke temporary object URLs when no longer needed.
- Never put seed phrases, private keys or signing credentials into Studio state, drafts, logs or provider requests.
- External AI/storage providers receive only the minimum content/data required for the requested service.

## NFT workflow boundary
`Use for NFT` prepares media and metadata. It does not silently mint, list, transfer or charge the user. Blockchain writes remain behind VIA's future authenticated/signing workflow and explicit review/confirmation.

## Initial implementation gate
Before adding Studio to public navigation:
1. build an isolated proof of concept;
2. verify mobile/touch behavior;
3. verify image memory limits;
4. verify export quality;
5. run dependency/license/security checks;
6. Vercel preview;
7. review integration with drafts/media/metadata;
8. PR and merge only when green.

## Fase 3 / research until verified
- true AI image-to-3D;
- paid generative AI;
- advanced video/audio editing;
- complex 3D modelling;
- provider-specific premium effects;
- cloud collaboration on Studio projects;
- automatic NFT minting after export.

These can be promoted when demand, cost, security and implementation quality justify them.