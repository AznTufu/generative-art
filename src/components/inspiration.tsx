import { Component } from 'react'
import '../style/work.scss'
import { image1, image2, image3, image4, image5, image6, image7, image8, image9 } from '../assets/inspiration';

export default class inspiration extends Component {
  render() {
    return (
      <section id='inspiration'>
        <div className='container'>
          <img src={image1} alt="bird" />
          <img src={image2} alt="bird" />
          <img src={image3} alt="bird" />
          <img src={image4} alt="bird" />
          <img src={image5} alt="bird" />
          <img src={image6} alt="bird" />
          <img src={image7} alt="bird" />
          <img src={image8} alt="bird" />
          <img src={image9} alt="bird" />
        </div>
      </section>
    )
  }
}
