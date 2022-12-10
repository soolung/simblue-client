export const authorization = () => {
    return {
        headers: {
            Authorization: `Bearer ${localStorage.token}`
        }
    }
}
