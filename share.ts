

export function share() {
    const date = new Date();
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const formattedDate = `${year}/${month}/${day}`;
    let text = `Reliade ${formattedDate}`;

    text += `\n\nPuzzle réussi.`

    text += `\n\nhttps://ferdodo.github.io/reliade`;
    navigator.clipboard.writeText(text);
}
