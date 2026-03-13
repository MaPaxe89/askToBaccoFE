import axios from 'axios';

const getProtectedData = async () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        const response = await axios.get("http://localhost:8080/api/data", {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        });
        return response.data;
    }
};