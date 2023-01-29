import { validate } from "../src/CpfValidator";

const validsCpfs = [
    "987.654.321-00",
    "71460238001",
    "31303021072",
    "144.796.170-60"
];

test.each(validsCpfs)('Deve testar um cpf valido: %s', function(cpf: string) {
    const isValid = validate(cpf);
    expect(isValid).toBeTruthy();
});

const invalidCpfs = [
    "222",
    "71460158001", 
    "31103021078",
    "211.030.210-78",
    "000.000.000-00",
    "111.111.111-11",
    "222.222.222-22",
    "333.333.333-33",
    "444.444.444-44",
    "555.555.555-55",
    "666.666.666-66",
    "777.777.777-77",
    "888.888.888-88",
    "999.999.999-99",
];

test.each(invalidCpfs)('Deve testar um cpf invalido: %s', function(cpf: string) {
    const isValid = validate(cpf);
    expect(isValid).toBeFalsy();
});

test('Deve testar um cpf null', function() {
    const isValid = validate(null);
    expect(isValid).toBeFalsy();
});

test('Deve testar um cpf undefined', function() {
    const isValid = validate(undefined);
    expect(isValid).toBeFalsy();
});
