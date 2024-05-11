import axios from "axios";

export const getCsrfToken = async () => {
    const { data } = await axios.get(`/api/csrf-token/`);

    axios.defaults.headers.common["X-CSRFToken"] = data.csrfToken;
};
