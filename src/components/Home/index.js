import {Component} from 'react'
import Navbar from '../Navbar'
import './index.css'

class Home extends Component {

    render() {
        return(
            <div className='home-route'>
                <Navbar/>
                <div className='home-section'>
                    <div className='home-header'>
                        <div className='home-header-txt-cont'>
                            <h1> Hello, <span className='home-user-name'>Brooklyn Simmons</span> 👋</h1>
                            <p> Welcome to <span>Spot trading!</span></p>
                        </div>
                        <button type='button' className='start-trading-btn'> Start Trading </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home 
