export function calcularValorTonelada(valorPeso: number, valorFrete: number): string {
    if (!valorPeso || isNaN(valorPeso) || Number(valorPeso) === 0) {
        return 0.00.toFixed(2);
    } else{
        const valorTonelada = valorFrete * valorPeso;
        return valorTonelada.toFixed(2);
    }

}  