function getRandomInt() {
    return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
}

export function GET_DUMMY_MATERIALS() {

return [
        {
            name: "Water",
            density: 1000,
            compression: { type: 'wave', waveSpeed: 1480, attenuation: 0 },
            shear: {type: 'fluid'},
            id: getRandomInt(),
        },
        {
            name: "Air",
            density: 1.225,
            compression: { type: 'wave', waveSpeed: 343, attenuation: 0.1 },
            shear: { type: 'fluid' },
            id: getRandomInt(),
        },
        {
            name: "Steel",
            density: 7850,
            compression: { type:  'wave', waveSpeed: 5900, attenuation: 0 },
            shear: { type: 'wave', waveSpeed: 3200, attenuation: 0 },
            id: getRandomInt(),
        },
        {
            name: "Silicon Rubber",
            density: 1580,
            compression: { type: 'wave', waveSpeed:950, attenuation: 0.5 },
            shear: { type: 'modulus', real: 1.38e6, imag: 0.1e6 },
            id: getRandomInt(),
        },
    ];
}