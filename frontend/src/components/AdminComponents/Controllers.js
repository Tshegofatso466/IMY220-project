import React from 'react';
import PropTypes from 'prop-types';
import '../../../public/assets/styles/AdminStyles/Controllers.css';
import '../../fontDefinition/fonts.css';
import withNavigation from '../../hoc.js';

class Controllers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 'Users',
        };
    }

    handleClick = (type) => {
        switch (type) {
            case 'Users':
                this.setState({ activeTab: 'Users' });
                this.props.handleUsers();
                break;
            case 'AdminOpps':
                this.setState({ activeTab: 'AdminOpps' });
                this.props.handleAdminOpps();
                break;
            default:
                console.error('Invalid tab type');
        }
    }

    render() {
        const { activeTab } = this.state;
        return (
            <div className="controllers">
                <button className={`tab-linkL ${activeTab === 'Users' ? 'active' : ''}`} onClick={() => this.handleClick('Users')}>Users Opperations</button>
                <button className={`tab-linkL ${activeTab === 'AdminOpps' ? 'active' : ''}`} onClick={() => this.handleClick('AdminOpps')}>Admin Opperations</button>
            </div>
        );
    }
}

Controllers.propTypes = {
    handleUsers: PropTypes.func.isRequired,
    handleAdminOpps: PropTypes.func.isRequired,
};

export default withNavigation(Controllers);



