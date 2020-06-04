'use strict'

module.exports = ({ Assertion, expect }) => {
  Assertion.addProperty('profile', function () {
    const obj = this._obj

    expect(obj).to.be.an('object')

    expect(obj.timeNanos).to.be.a('number')
    expect(obj.period).to.be.a('number')
    expect(obj.periodType).to.be.a('object')
    expect(obj.periodType.type).to.be.a('number')
    expect(obj.periodType.unit).to.be.a('number')
    expect(obj.sampleType).to.be.an('array').and.have.length.at.least(1)
    expect(obj.sample).to.be.an('array').and.have.length.at.least(1)
    expect(obj.location).to.be.an('array').and.have.length.at.least(1)
    expect(obj.function).to.be.an('array').and.have.length.at.least(1)
    expect(obj.stringTable).to.be.an('array')
    expect(obj.stringTable[0]).to.equal('')

    for (const sampleType of obj.sampleType) {
      expect(sampleType.type).to.be.a('number')
      expect(sampleType.unit).to.be.a('number')
    }

    for (const fn of obj.function) {
      expect(fn.filename).to.be.a('number')
      expect(fn.systemName).to.be.a('number')
      expect(fn.name).to.be.a('number')
      expect(fn.id).to.be.a('number')
    }

    for (const location of obj.location) {
      expect(location.id).to.be.a('number')
      expect(location.line).to.be.an('array')

      for (const line of location.line) {
        expect(line.functionId).to.be.a('number')
        expect(line.line).to.be.a('number')
      }
    }

    for (const sample of obj.sample) {
      expect(sample.locationId).to.be.an('array')
      expect(sample.locationId.length).to.be.gte(1)
      expect(sample.value).to.be.an('array').and.have.length(obj.sampleType.length)
    }
  })
}
