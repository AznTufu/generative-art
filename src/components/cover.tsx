import { Component } from 'react'
import '../style/cover.scss'
import Canvas from './canvas'

export default class cover extends Component {
  render() {
    return (
      <section id='cover'>
        <Canvas showCanvas1={false} />
        <div className='title'>
          L’Entrave Invisible
          <div className='subtitle'>Niro</div>
        </div>
      </section>
    )
  }
}
