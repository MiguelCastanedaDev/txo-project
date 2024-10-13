export default function processFullName(fullName: string) {
    // Dividir el nombre completo en palabras usando espacios
    const nameParts = fullName.trim().split(/\s+/);

    let firstName = "";
    let lastName = "";

    switch (nameParts.length) {
        case 4:
            // Si tiene 4 palabras, las dos primeras son el nombre y las dos últimas el apellido
            firstName = nameParts[0] + " " + nameParts[1];
            lastName = nameParts[2] + " " + nameParts[3];
            break;
        case 3:
            // Si tiene 3 palabras, la primera es el nombre y las dos últimas el apellido
            firstName = nameParts[0];
            lastName = nameParts[1] + " " + nameParts[2];
            break;
        case 2:
            // Si tiene 2 palabras, la primera es el nombre y la segunda el apellido
            firstName = nameParts[0];
            lastName = nameParts[1];
            break;
        default:
            firstName = nameParts.slice(0, 2).join(" ");
            lastName = nameParts.slice(2).join(" ");
            break;
    }

    return {
        firstName: firstName,
        lastName: lastName
    };
}
