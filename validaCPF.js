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

    return sequencias.includes(this.cpfLimpo);
}

const cpf = new ValidaCPF('705.484.450-52');
console.log(cpf);
if (cpf.valida()) {
    console.log('Cpf válido');
} else {
    console.log('Cpf inválido');
}