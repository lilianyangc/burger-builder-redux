import React,{Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';

// adding a second parameter to set the show
const withErrorHandler = (WrappedComponent, axios) => {

    return class extends Component {
        state= {
            error: null
        }


        
        componentWillMount(){
            // setting the error to null again
            this.reqInterceptor = axios.interceptors.request.use(req =>{
                this.setState({error: null })
                //let the response continue
                return req;
            })
            
            //setting up our gobal interceptor
            //we're not interested with the response, the first parameter
            //let the request continue
            this.resInterceptor = axios.interceptors.response.use(res => res, error =>{
                this.setState({error: error })
            })
        }

        componentWillUnmount (){
            // console.log('Will Unmount', this.reqInterceptor, this.resInterceptor);   
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.request.eject(this.resInterceptor);

        }

        errorConfirmedHandler = () =>{
            this.setState({error:null});
        }
            render(){

                return (
                    <>
                    {/* we only want to show this when something didn't work */}
                    <Modal 
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                    </>
                );
            }


    }
}



export default withErrorHandler;



// const withErrorHandler = (WrappedComponent, axios) => {

//     return (props) => {

//         return (
//             <>
//             {/* we only want to show this when something didn't work */}
//             <Modal>
//                 Somethign didn't work!
//             </Modal>
//             <WrappedComponent {...props} />
//             </>
//         );
//     }
// }