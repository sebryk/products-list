export default {
   meta: {
      type: 'suggestion',
      fixable: 'code',
      schema: [],
      messages: {
         wrapPx: 'Replace "{{original}}" with "{{fixed}}".',
      },
   },

   create(context) {
      const sourceCode = context.sourceCode

      const transformRaw = (rawInner) => {
         let changed = false
         const result = rawInner.replace(
            /(!?[-\w:/]+)-(\d+(?:\.\d+)?)px/g,
            (match, prefix, num, offset, str) => {
               const charBefore = str[offset - 1]
               const charAfter = str[offset + match.length]
               if (charBefore === '[' || charAfter === ']') return match

               changed = true
               return `${prefix}-[${num}px]`
            },
         )

         return changed ? result : null
      }

      const handleNode = (node) => {
         const raw = sourceCode.getText(node)
         const isTemplate = node.type === 'TemplateLiteral'
         const quote = isTemplate ? '`' : raw[0]
         const inner = raw.slice(1, -1)

         const fixedInner = transformRaw(inner)
         if (!fixedInner) return

         context.report({
            node,
            messageId: 'wrapPx',
            data: {
               original: inner.replace(/\s+/g, ' ').trim(),
               fixed: fixedInner.replace(/\s+/g, ' ').trim(),
            },
            fix(fixer) {
               return fixer.replaceText(node, `${quote}${fixedInner}${quote}`)
            },
         })
      }

      const handleJsxAttribute = (node) => {
         if (node.name?.type !== 'JSXIdentifier') return
         if (node.name.name !== 'className' && node.name.name !== 'class')
            return
         if (!node.value) return

         if (
            node.value.type === 'Literal' &&
            typeof node.value.value === 'string'
         ) {
            handleNode(node.value)
            return
         }

         const expr = node.value.expression

         if (
            node.value.type === 'JSXExpressionContainer' &&
            expr?.type === 'Literal' &&
            typeof expr.value === 'string'
         ) {
            handleNode(expr)
            return
         }

         if (
            node.value.type === 'JSXExpressionContainer' &&
            expr?.type === 'TemplateLiteral' &&
            expr.expressions.length === 0
         ) {
            handleNode(expr)
         }
      }

      return {
         JSXAttribute: handleJsxAttribute,
      }
   },
}
