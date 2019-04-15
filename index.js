module.exports = (reference = '', _placeholders = {}) => {
  if (!reference)
    throw Error('Can`t initiate reference without reference')

  const placeholders = Object.keys(_placeholders)
  const hasPlaceholders = Boolean(placeholders.length)

  const formatReference = (values) => (acc, placeholder) => {
    const ref = `{${placeholder}}`
    const value = (Boolean(values) && values[placeholder]) || undefined

    if (!value) return acc
    return acc.replace(new RegExp(ref), value)
  }

  const ref  = (values) => {
    if (!hasPlaceholders) return reference
    return placeholders.reduce(formatReference(values), reference)
  }

  const validateReference = () => {
    if (!hasPlaceholders) return

    const unreferencedPlaceholders = placeholders.filter(p => reference.indexOf(`{${p}}`) < 0)
    if (unreferencedPlaceholders.length) throw Error(`${unreferencedPlaceholders} were not referenced`)

    const referencesRegex = /{[^{}]+}/g
    const referenceValueRegex = /[^{}]+/g

    const referencedPlaceholders = reference
      .match(referencesRegex)
      .map(reference => reference.match(referenceValueRegex)[0])

    const referencesWithNoPlaceholder = referencedPlaceholders
      .filter(ref => !placeholders.includes(ref))
    const hasReferencesWithNoPlaceholder = Boolean(referencesWithNoPlaceholder.length)

    if (hasReferencesWithNoPlaceholder) throw Error(`${referencesWithNoPlaceholder} have no placeholders`)
  }

  validateReference()

  return {
    validateReference, // export for test reasons
    ref
  }
}
