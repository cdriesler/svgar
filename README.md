# Svgar

Svgar (pronounced: sugar) is an svg graphics library. This project is, at the end of the day, a personal bucket of effort and learning to make the tool I need to build the things I want. I fell into programming from a background in architecture and am invested in [defining](https://www.archdaily.com/936364/protocological-architectures-recursive-remembrance), implementing, and deploying design automation protocols.

So, this is "svg for architecture" and that comes with a few priorities:

- World coordinate system where +Z is 'up'
- Geometry based on [rhino3dm](https://github.com/mcneel/rhino3dm/blob/master/docs/javascript/RHINO3DM.JS.md)
- Objects with independent state
- Drawings as information-rich interfaces
- Delicious line quality

`v0.6` is currently in development with a 'rust-first' mindset. Still early, so not yet clear what that means.

`v0.5` was stopped in June 2020. It was the first version that used rust & wasm for geometry calculations, but the project architecture didn't quite respect the limitations of the technology. Performance was better, but still suffered. And the wasm libraries would not reliably load in all contexts.

`v0.4` was completed [Nov 2019](https://github.com/WeWorkSandbox/svgar). While it was somewhat useful for static assets, work needed to be done to make realtime graphics possible.
