import {Component} from 'react'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Legend,
    ResponsiveContainer,
  } from 'recharts'
  
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

class Organization extends Component {
    state = {apiData: [], apiSourceData: {},
        apiStatus: apiStatusConstants.initial
    }

    componentDidMount() {
        this.getPopulationData()
    }

    getPopulationData = async () => {
        this.setState({
          apiStatus: apiStatusConstants.inProgress,
        })
        const apiUrl = "https://datausa.io/api/data?drilldowns=Nation&measures=Population";
        const options = {
            method: 'GET',
        }
        const response = await fetch(apiUrl, options)
        if (response.ok) {
            const fetchedData = await response.json()
            console.log(fetchedData)
            const updatedData = fetchedData.data.map(eachDataItem => ({
                idNation: eachDataItem["ID Nation"],
                nation: eachDataItem["Nation"],
                idYear: eachDataItem["ID Year"],
                year: eachDataItem["Year"],
                population: eachDataItem["Population"],
                slugNation: eachDataItem["Slug Nation"]
            }))
            const updatedSourceData = {
                sourceName: fetchedData.source[0].annotations.source_name,
                sourceDescription: fetchedData.source[0].annotations.source_description,
                datasetName: fetchedData.source[0].annotations.dataset_name,
                datasetLink: fetchedData.source[0].annotations.dataset_link,
                tableId: fetchedData.source[0].annotations.table_id,
                topic: fetchedData.source[0].annotations.topic,
                subTopic: fetchedData.source[0].annotations.subtopic
            }
            this.setState({apiData: updatedData, apiSourceData: updatedSourceData, apiStatus: apiStatusConstants.success})
        }
    }

    renderLoadingView = () => (
        <div className="products-loader-container">
          <Loader type="ThreeDots" color="#28b42a" height="50" width="50" />
        </div>
    )

    renderPopulationGraphView = () => {
        const { apiData } = this.state;

    const DataFormatter = (number) => {
      if (number > 1000) {
        return `${(number / 1000).toString()}k`;
      }
      return number.toString();
    };

    // Sort the data by population in ascending order
    const sortedApiData = apiData.sort((a, b) => a.year - b.year);

    // Find the minimum and maximum population values
    const minPopulation = Math.min(...sortedApiData.map(item => item.population));
    const maxPopulation = Math.max(...sortedApiData.map(item => item.population));

    return (
      <div className='graph-container'>
        <ResponsiveContainer width="90%" height={500}>
            <BarChart data={sortedApiData.reverse()} margin={{ top: 5 }}>
            <XAxis dataKey="year" tick={{ stroke: "gray", strokeWidth: 1 }} />
            <YAxis dataKey="population" tickFormatter={DataFormatter} tick={{ stroke: "gray", strokeWidth: 0 }} domain={[minPopulation-10000000, maxPopulation]}  />
            <Legend wrapperStyle={{ padding: 30 }} />
            <Bar dataKey="population" name="Population in US" fill="#2c6933" barSize="20%" />
            </BarChart>
        </ResponsiveContainer>
      </div>
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
        const {apiSourceData} = this.state 

        return(
            <div className='organization-route'>
                <Navbar/>
                <div className='organization-section'>
                    <h1>Population Graph</h1>
                    {this.renderRelevantView()}
                    <div className='annotations-container'>
                        <h1>Annotations</h1>
                        <p>Source: {apiSourceData.sourceName}</p>
                        <p>Source Description: {apiSourceData.sourceDescription} </p>
                        <p>Dataset Name: {apiSourceData.datasetName}</p>
                        <p>Dataset Link: {apiSourceData.datasetLink}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Organization 
