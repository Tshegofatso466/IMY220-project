import React from 'react'; // Add this line
import { useNavigate } from 'react-router-dom';

// Higher-Order Component to inject `navigate` into class components
function withNavigation(Component) {
    return function (props) {
        const navigate = useNavigate();
        return <Component {...props} navigate={navigate} />;
    };
}

export default withNavigation; // Ensure it's a default export