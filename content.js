import DomSelector from 'react-native-dom-parser';

const ProxyServer = 'https://dry-ravine-43926.herokuapp.com/'
const SourceAddress = 'http://interaktif.final.com.tr/ajaxpro/_Default,App_Web_g3is2mij.ashx'


function ValidateCode(code) {
    return (typeof code == 'string') && (code.length == 6)
}

function EvaluateCode(code) {
    return fetch(`${ProxyServer}${SourceAddress}`, {
        method: 'POST',
        headers: {
            'Accept': '*/*',
            'Content-Type': 'text/plain; charset=utf-8',
            'Access-Control-Allow-Origin': '*',
            'X-AjaxPro-Method': 'VideoGetir',
            'Set-GPC': '1',
            'Cookie': 'ASP.NET_SessionId=4moopmq1x4ljaodkncrygdix',
            'Origin': 'example.com'
        },

        body: JSON.stringify({
            videoSifre: code,
        })
    })
        .then(response => response.json() )
        .then(response => {
            if (response.value === '~') { return null; }
            const srcText = response.value
            const dom = DomSelector('<div>' + srcText + '</div>');
            const sourceTag = dom.getElementsByTagName('source')[0]
            const src = sourceTag.attributes.src
            return 'http://interaktif.final.com.tr' + src.slice(1) 
        })
        .catch((e) => { console.log(e) })
}


export { ValidateCode, EvaluateCode }

