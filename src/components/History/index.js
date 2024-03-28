import {Component} from 'react'
import Navbar from '../Navbar'
import './index.css'

class History extends Component {

    render() {
        return(
            <div className='home-route'>
                <Navbar/>
                <div className='home-section assets-part'>
                    <h1> History </h1>
                    <img src="https://res.cloudinary.com/jayakrishnavamsi/image/upload/v1711623594/istockphoto-1469238121-640x640_nx3wcg.jpg" alt="coming-soon-image" />
                </div>
            </div>
        )
    }
}

export default History 
