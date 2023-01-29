export function validate(rawCpf: string | null | undefined) {
    if (!rawCpf) return false;
    const cleanCpf = rawCpf.replace(/\D/g, "");
    if (isInvalidLength(cleanCpf) || allDigitsTheSame(cleanCpf)) return false;

    const digit1 = calculateDigit(cleanCpf, 10);
    const digit2 = calculateDigit(cleanCpf, 11);
    const actualDigits = extractDigits(cleanCpf);
    const validatedDigit = `${digit1}${digit2}`;

    return actualDigits === validatedDigit;
}

function calculateDigit(cpf: string, factory: number) {
    let total = 0;
    for (const digit of cpf) {
        if(factory > 1) total += parseInt(digit) * factory--;
    }
    const rest = total % 11;
    return rest < 2 ? 0 : 11 - rest
}

function isInvalidLength(cpf: string) {
    return cpf.length !== 11;
}

function allDigitsTheSame(cpf: string) {
    const [ firstDigit ] = cpf;
    return cpf.split("").every(digit => digit === firstDigit)
}

function extractDigits(cpf: string) {
    return cpf.slice(9);
}