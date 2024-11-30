function getToken(ra, digit, uf, password) {
    const token = {
        ra,
        digit,
        uf,
        password
    };

    return btoa(JSON.stringify(token));
}

async function tryLogin(token) {
    try {
        const decodedToken = JSON.parse(atob(token));
        const { ra, digit, uf, password } = decodedToken;

        const response = await fetch('https://edusp-api.ip.tv/registration/edusp', {
            'headers': {
                'content-type': 'application/json',
                'x-api-platform': 'webclient',
                'x-api-realm': 'edusp'
            },
            'body': JSON.stringify({"realm":"edusp","platform":"webclient","id":`${ra}${digit}${uf.toLowerCase()}`,"password":password}),
            'method': 'POST',
        });

        return await response.json();
    } catch (error) {
        return null;
    }
}

module.exports = { getToken, tryLogin };
