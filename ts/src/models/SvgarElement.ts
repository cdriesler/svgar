import { GeometryType } from '../enums'

export default class SvgarElement {

    private id: string
    private type: GeometryType

    constructor(id: string, type: GeometryType) {
        this.id = id
        this.type = type
    }

}