// <template>
//   <component class="smart" :is="comp()">
//     <template v-for="c in component.children">
//       <smart :component="c"></smart>
//     </template>
//   </component>
// </template>

import { trans } from './smart/all'

export default {
  functional: true,
  name: 'smart',
  render (h, context) {
    let data = context.props.data
    if (!data || !data.role) {
      throw new Error('没有role啊！')
    }
    console.log(data.role, context.slots(), context)
    return h(trans(data.role),
      {
        attrs: {
          class: 'smart'
        },
        props: data.ps
      },
      (Array.isArray(data.children) ? data.children : [])
        .map(data => h('smart', { props: {data} }))
    )
  },
  renderError (h, err) { // Only works in development mode.
    return h('pre', { style: { color: 'red' } }, err.stack)
  }
}
