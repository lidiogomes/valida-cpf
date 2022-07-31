// 705.484.450-52 070.987.720-03
/*
7x  0x 5x 4x 8x 4x 4x 5x 0x
10  9  8  7  6  5  4  3  2
70  0  40 28 48 20 16 15 0 = 237

11 - (237 % 11) = 5 (Primeiro dígito)
Se o número digito for maior que 9, consideramos 0.

7x  0x 5x 4x 8x 4x 4x 5x 0x 5x
11 10  9  8  7  6  5  4  3  2
77  0  45 32 56 24 20 20 0  10 = 284

11 - (284 % 11) = 2 (Primeiro dígito)
Se o número digito for maior que 9, consideramos 0.
*/

function ValidaCPF(cpf) {
    Object.defineProperty(this, 'cpfLimpo', {
        enumerable: true,
        get: function () {
            if (cpf === undefined) return '';
            return cpf.replace(/\D+/g, '');
        }
    });
}

ValidaCPF.prototype.valida = function () {
    if (!this.cpfLimpo) return false;
    if (this.cpfLimpo.length !== 11) return false;
    if (this.validaRepeticao()) return false;

    const cpfParcial = this.cpfLimpo.slice(0, -2);
    const digito1 = this.criarDigito(cpfParcial);
    const digito2 = this.criarDigito(cpfParcial + digito1);

    const cpfGerado = cpfParcial + digito1 + digito2;
    return cpfGerado === this.cpfLimpo;
}

ValidaCPF.prototype.criarDigito = function (cpfParcial) {
    const cpfArray = Array.from(cpfParcial);

    let regressivo = cpfArray.length + 1;
    const total = cpfArray.reduce((ac, val) => {
        ac += Number(val) * regressivo;
        regressivo--;
        return ac
    }, 0);

    const digito = 11 - (total % 11);
    return digito > 9 ? 0 : String(digito);
}

ValidaCPF.prototype.validaRepeticao = function () {
    const sequencias = [
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999'
    ];

    return sequencias.find(el => el === this.cpfLimpo);
}

const cpf = new ValidaCPF('705.484.450-52');
console.log(cpf);
if (cpf.valida()) {
    console.log('Cpf válido');
} else {
    console.log('Cpf inválido');
}