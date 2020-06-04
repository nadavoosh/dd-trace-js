'use strict'

const { expect } = require('chai')
const path = require('path')

describe('mapper', () => {
  let SourceMapper
  let mapper
  let root

  beforeEach(() => {
    SourceMapper = require('../../src/profiling/mapper').SourceMapper
    mapper = new SourceMapper()
    root = path.resolve(__dirname, 'mapper', 'sourcemaps')
  })

  it('should map with inline source maps', async () => {
    const filename = path.join(root, 'dist', `inline.js`)
    const url = `file://${filename}`

    const source = await mapper.map({ url, lineNumber: 11, columnNumber: 17 })

    expect(source).to.have.property('url', `file://${path.join(root, 'src', 'greeter.ts')}`)
    expect(source).to.have.property('lineNumber', 2)
    expect(source).to.have.property('columnNumber', 2)
    expect(source).to.have.property('functionName')
  })

  it('should map with source maps at an external URL', async () => {
    const filename = path.join(root, 'dist', `url.js`)
    const url = `file://${filename}`

    const source = await mapper.map({ url, lineNumber: 11, columnNumber: 17 })

    expect(source).to.have.property('url', `file://${path.join(root, 'src', 'greeter.ts')}`)
    expect(source).to.have.property('lineNumber', 2)
    expect(source).to.have.property('columnNumber', 2)
    expect(source).to.have.property('functionName')
  })

  it('should fallback when there is no source map', async () => {
    const filename = path.join(root, 'dist', 'missing.js')
    const url = `file://${filename}`

    const source = await mapper.map({
      url,
      lineNumber: 11,
      columnNumber: 17,
      functionName: 'test'
    })

    expect(source).to.have.property('url', url)
    expect(source).to.have.property('lineNumber', 11)
    expect(source).to.have.property('columnNumber', 17)
    expect(source).to.have.property('functionName', 'test')
  })

  it('should fallback for internal modules', async () => {
    const url = `internal.js`

    const source = await mapper.map({
      url,
      lineNumber: 11,
      columnNumber: 17,
      functionName: 'test'
    })

    expect(source).to.have.property('url', url)
    expect(source).to.have.property('lineNumber', 11)
    expect(source).to.have.property('columnNumber', 17)
    expect(source).to.have.property('functionName', 'test')
  })
})
