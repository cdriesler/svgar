# Svgar

Svgar (pronounced: sugar) is an svg graphics library. A few years back I spent a summer internship developing a [space planning script](https://github.com/WeWorkSandbox/svgar) in grasshopper. Near the end of the process, I was asked to implement some basic interactivity. Quickly realized I did not have the tools for the job and pivoted to web development.

This project is, at the end of the day, a personal bucket of effort to make the tool I need to build the software I want. So, this is "svg for architecture" and that comes with a few priorities:

- World coordinate system where +Z is 'up'
- Geometry based on [rhino3dm](https://github.com/mcneel/rhino3dm/blob/master/docs/javascript/RHINO3DM.JS.md)
- Objects with independent state
- Delicious line quality

`v0.4` was completed [Nov 2019](https://github.com/WeWorkSandbox/svgar). While it was somewhat useful for static assets, work needed to be done to make realtime graphics possible. `v0.5` is currently exploring the magic .wasm promises and refactoring the api for more intuitive use.
