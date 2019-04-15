const reference = require('./index')

describe('reference', () => {
  let travelRef
  beforeEach(async () => {
    travelRef = await reference('/travels')
  })

  describe('initiate reference', () => {
    it('should not accept without admin or reference', () => {
      expect(() => reference('')).toThrow()
    })

    it('should initate simple reference', () => {
      expect(travelRef).toBeDefined()
    })

    it('should not initate complex reference with placeholders unreferenced', () => {
      const ref = 'travels/{travel_id}/report'
      const placeholders = { travel_id: '', report_id: '', ticket_id: '' }

      expect(() => reference(ref, placeholders)).toThrow('report_id,ticket_id were not referenced')
    })

    it('should not initate complex reference with referenced placeholders not in opts', () => {
      const ref = 'travels/{travel_id}/report/{ticket_id}'
      const placeholders = { travel_id: '' }

      expect(() => reference(ref, placeholders)).toThrow('ticket_id have no placeholders')
    })

    it('should initate complex reference if all placeholders were referenced', () => {
      const ref = 'travels/{travel_id}/report/{report_id}/ticket'
      const placeholders = { travel_id: '', report_id: '' }

      const ticketRef = reference(ref, placeholders)
      expect(ticketRef).toBeDefined()
    })
  })

  describe('format reference', () => {
    it('format simple reference', () => {
      const ref = '/travels'
      expect(travelRef.ref()).toBe(ref)
    })

    it('format complex reference with no values', () => {
      const ref = '/travels/{travel_id}'
      const t = reference(ref, { travel_id: '' })
      expect(t.ref()).toBe(ref)
    })

    it('format complex reference values', () => {
      const ref = reference(
        '/travels/{travel_id}/report/tickets/{ticket_id}',
        { travel_id: '', ticket_id: '' }
      )

      expect(ref.ref({ travel_id: 2, ticket_id: 2 })).toBe('/travels/2/report/tickets/2')
    })
  })
})
