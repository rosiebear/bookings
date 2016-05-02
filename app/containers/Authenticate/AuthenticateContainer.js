import React, { PropTypes } from 'react'
import { Authenticate } from 'components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActionCreators from 'redux/modules/users'

const AuthenticateContainer = React.createClass({
    propTypes: {
        isFetching: PropTypes.bool.isRequired,
        error: PropTypes.string.isRequired,
        fetchAndHandleAuthedUser: PropTypes.func.isRequired,
    },
    contextTypes: {
        router: PropTypes.object.isRequired,
    },
    handleAuth () {
        this.props.fetchAndHandleAuthedUser()
            .then(() => this.context.router.replace('feed'))
    },
    render () {
        return (
            <Authenticate
                onAuth={this.handleAuth}
                isFetching={this.props.isFetching}
                error={this.props.error} />
        )
    },
})

function mapStateToProps (state) {
    return {
        isFetching: state.isFetching,
        error: state.error
    }
}

function mapDispatchToProps (dispatch) {
    return bindActionCreators(userActionCreators, dispatch)
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthenticateContainer)