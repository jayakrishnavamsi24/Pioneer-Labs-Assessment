import {Component} from 'react'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
  
import Loader from 'react-loader-spinner';
import Navbar from '../Navbar'
import './index.css'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";



const apiStatusConstants = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    failure: 'FAILURE',
    inProgress: 'IN_PROGRESS',
}

class Trade extends Component {
    state = {apiData: {},
        apiStatus: apiStatusConstants.initial
    }

    componentDidMount() {
        this.getPopulationData()
    }

    getPopulationData = async () => {
        this.setState({
          apiStatus: apiStatusConstants.inProgress,
        })
        const apiUrl = "https://api.coindesk.com/v1/bpi/currentprice.json";
        const options = {
            method: 'GET',
        }
        const response = await fetch(apiUrl, options)
        if (response.ok) {
            const fetchedData = await response.json()
            console.log(fetchedData)
            this.setState({apiData: fetchedData, apiStatus: apiStatusConstants.success})
        }
    }

    renderLoadingView = () => (
        <div className="products-loader-container">
          <Loader type="ThreeDots" color="#28b42a" height="50" width="50" />
        </div>
    )

    renderPopulationGraphView = () => {
        const { apiData } = this.state;
        const { bpi } = apiData;
        const currencyData = Object.keys(bpi).map(currency => ({
            currency: bpi[currency].description,
            rate: parseFloat(bpi[currency].rate_float.toFixed(2)), // Convert rate to float with 2 decimal places
        }));
        console.log(currencyData)
        return (
            <ResponsiveContainer width="100%" height={400}>
                <BarChart
                    data={currencyData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="currency" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="rate" fill="#8884d8" name="Bitcoin Price" />
                </BarChart>
            </ResponsiveContainer>
        );
    }

    renderRelevantView = () => {
        const {apiStatus} = this.state

        switch (apiStatus) {
            case apiStatusConstants.success:
                return this.renderPopulationGraphView()
            case apiStatusConstants.inProgress:
                return this.renderLoadingView()
            default:
                return null
        }
    }
        
    render() {
        const {apiData, apiStatus} = this.state 
        console.log(apiData)
        return(
            <div className='organization-route'>
                <Navbar/>
                <div className='organization-section'>
                    <h1>Cryptocurrency Prices</h1>
                    {this.renderRelevantView()}
                    {apiStatus === "SUCCESS" && (
                        <div className='annotations-container'>
                            <h1>Annotations</h1>
                            <p>Disclaimer: {apiData.disclaimer}</p>
                            <p>updated: {apiData.time.updated} </p>
                            <p>updatedISO: {apiData.time.updatedISO}</p>
                            <p>updateduk: {apiData.time.updateduk}</p>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default Trade 
