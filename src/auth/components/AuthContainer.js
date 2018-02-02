import React from 'react'
import { withApollo } from 'react-apollo'
import Dialog from 'material-ui/Dialog';

import withDialog from '../../app/components/notification/withDialog'
import IDENTIFY_USER from '../graphql/identifyUser.graphql'
import CREATE_USER from '../graphql/createUser.graphql'

import Auth from './Auth'

class AuthContainer extends React.Component {
  constructor() {
    super()
    this.state = {
      session: {
        name: null
      }
    }
  }

  login = (values) => {
    console.log('onSubmitLogin', values)
  }

  registerUser = (variables) => {
    //const template = this.getTemplate()
    console.log('registerUser -> variables', variables)
    this.props.client.mutate({
      mutation: CREATE_USER,
      variables,
    }).then(({ data }) => {
      const name =  data.identifyUser.first_name
      this.props.dialog.open({ message: `Thanks for registering ${name}`})
      this.setState({ session: { name } })
    }).catch(error => {
      console.log('error', error)
    })
  }

  indentifyUser = () => {
    this.getVerificationTemplate().then( template => {
      console.log('getVerificationTemplate:', template)
      debugger
      this.props.client.query({
        query: IDENTIFY_USER,
        variables: { template: template },
      }).then(({ data }) => {
        console.log('data', data)
        if (data.identifyUser) {
          this.setState({ session: { name: data.identifyUser.first_name } })
        } else {
          this.props.dialog.open({ message: `No match`})
        }
      }).catch(error => {
        console.log('error', error)
      })
    })
  }

  getEnrolmentTemplate = (finger = 0, timeout = 20000, showPrompt = true, errorCallback) => {
    const { plugin } = this.props
/*
    return Promise.resolve('egIAAB4IAFtsjFkAAAAAHw4AT0syMkFBSjYwMDExODchAQAAIFACSAIAACAUNwAEAWQDAAAAQDcABAHhBwgKDxcWAAAAAAA3AAQBAAAAAAAAAAAAAAAAAAAAABACAAD2xkkfvEPTKPEFxgkqjNoEmVYKPuKEnDj+u2Gg+9k5bw/EqRlG3aVl/1GjAzOAbtUQgfbl4qhm+Eh45R1zfzmDTcGkdOonhCH8y4EaGTVWR4KejP1pmpy36SMnsGrdyIAPxgbqVgnbQIwSHtwjJpoZgGS4Q86GVGMQR4vFCzhAsDCvJiirHxCQLljJs0MQzn675htVvG/zITlJLiLPcl+W/D9QOcnnQa7oeiqSgMJzl1P/af2lrwLnJUZUnY/1fCBdc8D9upRdN9YefnddewS6uuu7E/XfjGUWRP97YWfbqcm6dakPuoj/aS+wyWagvK7ZWD4o+23a5qXdrgnp0jVh74C+zI2bys9/7RNMaoyneRCAXYK+Ui+UZGQSDnSKaRoEYWRoLtWwI4vWmPlazuXgyZeJHSyJKx9EatH6GPxV2nIfnof5bJ1A0s1fAW46Oo4La3kNpjLfXJ98YDN66jsRPIlMfTCJfgBkQ9UceHxBZP5J4IenKcAKqT/r/g7CzoMS04dyduDErtwvvfdSy0t032pdhfmx1f4NTJLolrE/yDiSulsIL4ufS6uHkEwTdsZErp/cXAUs29Gd9A+0RChy7CFqxs1r74hlfiK0nfxs+sCQjMt218Er7pkZ+lt7NbQRyeFim73PtmPgJP1+F1EDaKcviWZr4SFkscRa6Gb48IGh8a44UoI2haA/KQe1FLEAAAAAKqhxQCIEAC1gSa8=')
*/
		return plugin.getEnrolmentTemplate(finger, timeout, showPrompt).then(
		  (fvTemplate) => {
				if(this.isSuccess(fvTemplate))
				{
          console.log('enrolement template2', fvTemplate)
          return Promise.resolve(fvTemplate)
				}
				else
				{
          // The plugin doesn't understand Promise.reject
          console.log('enrolement error1', fvTemplate)
					if(errorCallback)
						errorCallback(fvTemplate)
				}
			},
			(errorInfo) => {
        console.log('enrolement error2', errorInfo)
				if(errorCallback)
					errorCallback(errorInfo)
			}
		)
	}

	getVerificationTemplate = (finger = 0, timeout = 20000, showPrompt = true, errorCallback) => {
    //if (plugin && plugin.getVerificationTemplate) {
      const { plugin } = this.props
      /*
      return Promise.resolve('egMAAB4IAFvOjVkAAAAAHw4AT0syMkFBSjYwMDExODchAQAAIFADSAMAACAUNwAEAWQBAAAAQDcABAHhBwgLECEvAAAAAAA3AAQBAAAAAAAAAAAAAAAAAAAAABADAAD1V5/QjHPOfv9CKqOZl/YTB1FwNr079SDkYjlpH8nPXkurq8sPX8c3qRW86FWEdmo5DFgyvhfASmTjPoFJz80higTutEaLk2FFewKuoSPv6gVaO9VvcrFou0eqZuYEpGOEPniEY5vGlWGOX6xW4CDv+hNS/glq+VGHw9Nk3GHEcS3tpdKQi9IZkkKDP0wwjwLrZytg1KNGn9IWWcFQwWWnOKvmbesOlluAFeTMRWnaBC85LS5k52BxYCRdL7RUn925+W+72Ib/tEFRheXncZKZsZaBTSIJjinEcv8tT4Jp92dTE4W33aClPD5TCcpfBkbsSw+UtbexAsRacVvbUEFb4gfXe/R51fugBIMbyMVZsuVkPq3Ez2dok6s0TlV4EJ8VNPd2J0zXQpoekh6yXeGvz92z/VhjjKbnjoRuKXRNTjs9Vm63GAF/J+QZKatycTE3yXf2f52Sg7lc5W6KYFFOaR/0Djpu3zrunRwujO97GBtrmfXKzRfkUAA6jjpfPKQOLcMOMO9NDMUZ9Z+DWwEhtBTdMX7jqi88/xj4zwm+9hOMrssvwsRFab9AsNX1R6q8sG9+O3NBBZs6Hb9A5ZoVk1aiqeG3a17SORKsRFs7a1wEf99258L5rFaLawtf4yFzhcM3SlNRil/lU4fvnh9Vc80cxM+IPWXgYSdxLrZoat8or16XgfAheE7dmh7qF5sLCLuEJL9aMyiE2mWx310Mz5nhf4GQh6gggMpBzi+aqugH2icHKCxmmBr0bskgDGrp37FP8f93INBLO2KW3m6ov7X38uut/moCDu3k/NV82T2QlfzpDfxu2n5JUtst/xs+IZRS6KBdh0A9XBxAshmooP9MiQoKf8nZBHtDeEuozGajpN')
      */

  		return plugin.getVerificationTemplate(finger, timeout, showPrompt).then(
    		(fvTemplate) => {
  				if(this.isSuccess(fvTemplate))
  				{
            return Promise.resolve(fvTemplate)
  				}
  				else
  				{
            // The plugin doesn't understand Promise.reject
            if(errorCallback)
  						errorCallback(fvTemplate)
  				}
  			},
  			(errorInfo) => {
  				if(errorCallback)
  					errorCallback(errorInfo)
  			}
  		)
    //}
	}

  isSuccess = (resultStr) => {
		let isSuccessResponse = true;
		let response = resultStr.trim()

		if(!response || response.length === 0)
    	isSuccessResponse = false;
		else if(response.toUpperCase().lastIndexOf("Error".toUpperCase()) === 0)
			isSuccessResponse = false
		else if(response.toUpperCase().lastIndexOf("Warning".toUpperCase()) === 0)
			isSuccessResponse = false
		else
			isSuccessResponse = true

		return isSuccessResponse
	}

  render () {
    return (
      <Auth
        login={this.login}
        indentifyUser={this.indentifyUser}
        registerUser={this.registerUser}
        getEnrolmentTemplate={this.getEnrolmentTemplate}
        session={this.state.session}
      />
    )
  }
}

// const indentifyUser = graphql(IDENTIFY_USER, {
//   name: 'indentifyUser'
// })

//export default indentifyUser(AuthContainer)
export default withDialog(withApollo(AuthContainer))
