export class StartSimulationDTO {
    public origin: string;
    public destination: string;
    public reg: string;

    constructor(origin, destination, reg) {
        this.origin = origin;
        this.destination = destination;
        this.reg = reg;
    }
}