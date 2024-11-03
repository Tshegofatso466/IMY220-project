import React from 'react';
import Genres from '../../components/AdminComponents/Genres';
import Users from '../../components/AdminComponents/Users';
import Controllers from '../../components/AdminComponents/Controllers';
import '../../fontDefinition/fonts.css';
import '../../../public/assets/styles/AdminStyles/Main.css'; // Add your custom styles here

export class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 'Users',
            genres: ['Rock', 'Pop', 'Jazz'], // Initial genres
        };
    }

    handleUsers = () => {
        this.setState({ activeTab: 'Users' });
    }

    handleAdminOpps = () => {
        this.setState({ activeTab: 'AdminOpps' });
    }

    renderContent() {
        const { activeTab, genres } = this.state;

        switch (activeTab) {
            case 'Users':
                return <Users />;
            case 'AdminOpps':
                return (
                    <div>
                        <h2>Admin Operations</h2>
                        <Genres genres={genres} />
                    </div>
                );
            default:
                return null;
        }
    }

    render() {
        return (
            <div className="mainL">
                <img className="background-imageL" src="/assets/images/RANDOM/latest2.jpg" alt="Background" />
                <Controllers handleUsers={this.handleUsers} handleAdminOpps={this.handleAdminOpps} />
                <div className="contentL">
                    {this.renderContent()}
                </div>
            </div>
        );
    }
}