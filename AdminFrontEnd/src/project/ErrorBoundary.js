import {Component} from 'react'

export class ErrorBoundary extends Component{

    constructor(props){
        super(props)
        this.state = {
            hasError: false
        }

    }

    static getDerivedStateFromError(error){
        return {
            hasError: true,
        }
    }

    componentDidCatch(error, errorInfo){
        console.log('Error Logging', error, errorInfo)


    }

    render(){

        if(this.state.hasError){
            return (<><h1> something went wrong </h1> <h3>Check the console logs</h3></>)
        }

        // eslint-disable-next-line react/prop-types
        return this.props.children
    }
}