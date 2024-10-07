export default function GenerateUUID(){
    let uuid = window.crypto.randomUUID();
    console.log("UUID de la sesión: " + uuid);
    sessionStorage.setItem('session_uuid', uuid);
    const cyberSourcerScript = document.createElement('script');
    cyberSourcerScript.id = 'cybersource';
    cyberSourcerScript.src = `https://tools.clip.mx/transparent/risk?session_id=${uuid}`

    document.body.appendChild(cyberSourcerScript);
}

GenerateUUID();