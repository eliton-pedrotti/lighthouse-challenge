
export default function validPass(p: string): boolean {

    let verify = false;
    let capitalLetters = /[A-Z]/;
    let smallLetters = /[a-z]/;
    let numbers = /[0-9]/;

    if (p.length < 8) {
        return verify;
    }

    let auxCapital = 0;
    let auxSmall = 0;
    let auxNumber = 0;

    for (let i = 0; i < p.length; i++) {
        if (capitalLetters.test(p[i]))
            auxCapital++;
        else if (smallLetters.test(p[i]))
            auxSmall++;
        else if (numbers.test(p[i]))
            auxNumber++;
    }

    if (auxCapital > 0) {
        if (auxSmall > 0) {
            if (auxNumber > 0) {
                verify = true;
            }
        }
    }

    return verify;
}