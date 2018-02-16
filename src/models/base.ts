export interface Serializable<T> {
    deserialize(input: Object): T;
    serialize?(): any;
}

export interface Eav {
    code: string;
    value: string| Eav[];
}

export interface EavSerializable {
    eavDeserialize(input: Eav[]|Eav);
}

export class DefaultSerializationMixin implements EavSerializable {
    /**
     * 
     * CAVEAT: Does not handle an array of serializable
     */
    eavDeserialize(input) {
        if (!(input instanceof Array))
            input = [input]

        for (var eav of input) {
            var attrName = eav.code;
            var attrValue = eav.value;
            var attrTitle = eav.title;
            var attr = this[attrName];

            if (typeof attr === 'object' && 'eavDeserialize' in attr ){
                attr.eavDeserialize(attrValue);
            }
            else {
                this[attrName] = attrValue;
                // Display title for attribut
                attrTitle = attrTitle != null ? attrTitle : attrName;
                this[`${attrName}__display`] = attrTitle;
            }

        }
    }
}