import { Component } from 'react'
import '../style/navbar.scss'

export default class header extends Component {
  render() {
    return (
      <div className='navbar-container'>
        <div className='navbar'>
          <a href='#inspiration'>Inspiration</a>
          <a href='#cover'>Cover</a>
        </div>
        <div className='links'>
          <a href='https://music.youtube.com/channel/UCNf9M9rM9OixCqhrwCjZSJQ' target='_blank'>Youtube Music</a>
          <a href='https://open.spotify.com/intl-fr/artist/1wAtSe79kItIb9nf5EhI2Q' target='_blank'>Spotify</a>
        </div>
      </div>
    )
  }
}
