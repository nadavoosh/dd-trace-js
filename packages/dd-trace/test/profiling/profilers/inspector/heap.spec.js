'use strict'

const { expect } = require('chai')

describe('profilers/inspector/heap', () => {
  let InspectorHeapProfiler
  let profiler
  let mapper

  beforeEach(() => {
    InspectorHeapProfiler = require('../../../../src/profiling/profilers/inspector/heap').InspectorHeapProfiler

    mapper = { map: callFrame => Promise.resolve(callFrame) }
    profiler = new InspectorHeapProfiler()
  })

  afterEach(() => {
    profiler.stop()
  })

  it('should serialize profiles in the correct format', done => {
    profiler.start({ mapper })

    const obj = {}

    // heap profiler doesn't start synchronously
    setImmediate(async () => {
      // force at least the minimum sampling interval
      for (let i = 0; i < 512 * 1024; i++) {
        obj[`${i}`] = i * 2
      }

      const profile = await profiler.profile()

      expect(profile).to.be.a.profile

      done()
    })
  })
})
