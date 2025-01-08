import './App.css'
import Canvas from './components/canvas'
import Navbar from './components/navbar'
import Inspiration from './components/inspiration'
import Cover from './components/cover'

function App() {
  return (
    <>
      <div className='main'>
        <Canvas showCanvas1={true} />
        <Navbar />
        <Inspiration />
        <Cover />
      </div>
    </>
  )
}

export default App
